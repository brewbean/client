import axios from 'axios'
import {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  createClient,
  Provider as UrqlProvider,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from 'urql'
import { devtoolsExchange } from '@urql/devtools'
import { authExchange } from '@urql/exchange-auth'

import { useAlert, alertType } from './AlertContext'
import {
  addAuthToOperation,
  didAuthError,
  getTokenFromRefresh,
  willAuthError,
  logout,
} from 'helper/auth'
import { AUTH_API, GRAPHQL_API } from 'config'
import { GET_BARISTA } from 'queries'

const AuthContext = createContext()

const initialState = {
  token: null,
  tokenExpiry: null,
  barista: null,
  hasInit: false,
  isIntroModalOpen: false,
  isLoggedIn: false,
  isFetching: localStorage.getItem('hasLoggedIn') === 'yes',
}

function reducer(state, [type, payload]) {
  switch (type) {
    case 'setBarista':
      return { ...state, barista: payload }
    case 'setIsFetching':
      return { ...state, isFetching: payload }
    case 'setJWT':
      return {
        ...state,
        token: payload.token,
        tokenExpiry: payload.tokenExpiry,
      }
    case 'login':
      return { ...state, isLoggedIn: true }
    case 'setIsIntroModalOpen':
      return { ...state, isIntroModalOpen: payload }
    case 'finishInitBarista':
      return { ...state, hasInit: true }
    case 'logout':
      return { ...initialState, isFetching: false }
    default:
      return state
  }
}

/**
 * authPaths equal array of path names that are authenticated ['/profile']
 * causes failed refreshes to go to login page
 * otherwise just continue to guest version of page
 */
function AuthProvider({ authOnlyPaths, children }) {
  const history = useHistory()
  const { pathname } = useLocation()
  const { addAlert } = useAlert()

  const [state, dispatch] = useReducer(reducer, initialState)

  const _logout = async () =>
    await logout(authOnlyPaths, history, pathname, dispatch)

  useEffect(() => {
    const initialize = async () => {
      if (localStorage.getItem('hasLoggedIn') === 'yes') {
        const { ok, token, tokenExpiry } = await getTokenFromRefresh()
        if (ok) {
          dispatch(['setJWT', { token, tokenExpiry }])
          dispatch(['login'])
        } else {
          await _logout()
        }
      }
    }
    const syncLogout = async (event) => {
      if (event.key === 'logout') {
        await _logout()
      }
    }
    initialize()
    window.addEventListener('storage', syncLogout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const getBarista = async () => {
      if (state.isLoggedIn && !state.hasInit) {
        try {
          dispatch(['setIsFetching', true])

          const { data } = await axios.post(
            GRAPHQL_API,
            { query: GET_BARISTA },
            { headers: { authorization: `Bearer ${state.token}` } }
          )

          if (data.errors) {
            const error = data.errors[0]
            addAlert({
              type: alertType.ERROR,
              header: error.extensions.code,
              message: error.message,
            })
          } else {
            const barista = data.data.barista[0]
            dispatch(['setBarista', barista])
          }
          dispatch(['finishInitBarista'])
          dispatch(['setIsFetching', false])
        } catch (e) {
          console.error(e.message)
        }
      }
    }
    getBarista()
  }, [state.isLoggedIn, state.token, state.hasInit, addAlert])

  const login = async (email, password) => {
    try {
      const {
        data: { token, tokenExpiry },
      } = await axios.post(
        AUTH_API + '/login',
        { email, password },
        { withCredentials: true }
      )
      dispatch(['setJWT', { token, tokenExpiry }])
      dispatch(['login'])
      window.localStorage.setItem('hasLoggedIn', 'yes')
      history.push('/')
    } catch (err) {
      if (!err.response && err.message === 'Network Error') {
        addAlert({
          type: alertType.ERROR,
          header: err.message,
          message: 'Our servers or your internet may be down at this time.',
        })
      } else {
        addAlert({
          type: alertType.ERROR,
          header: err.response.data.message,
          message: 'Please retry logging in',
        })
      }
    }
  }

  const signup = async ({ email, displayName, password }) => {
    try {
      const {
        data: { token, tokenExpiry },
      } = await axios.post(
        AUTH_API + '/signup',
        { email, displayName, password },
        { withCredentials: true }
      )
      dispatch(['setJWT', { token, tokenExpiry }])
      dispatch(['login'])
      dispatch(['setIsIntroModalOpen', true])
      window.localStorage.setItem('hasLoggedIn', 'yes')
    } catch (err) {
      if (!err.response && err.message === 'Network Error') {
        addAlert({
          type: alertType.ERROR,
          header: err.message,
          message: 'Our servers or your internet may be down at this time.',
        })
      } else {
        addAlert({
          type: alertType.ERROR,
          header: err.response.data.message,
          message: 'Please try again.',
        })
      }
    }
  }

  // --- URQL SETUP ---
  const getAuth = async ({ authState }) => {
    if (!authState) {
      if (state.token) {
        return { token: state.token }
      }
      return null
    }
    // --- GET REFRESH TOKEN ---
    const { ok, token, tokenExpiry } = await getTokenFromRefresh()
    if (ok) {
      dispatch(['setJWT', { token, tokenExpiry }])
      return { token, tokenExpiry }
    }

    // --- REFRESH FAIL ---
    await _logout()
    return null
  }

  const client = useMemo(() => {
    return createClient({
      url: GRAPHQL_API,
      exchanges: [
        devtoolsExchange,
        dedupExchange,
        cacheExchange,
        authExchange({
          getAuth,
          addAuthToOperation,
          willAuthError,
          didAuthError,
        }),
        fetchExchange,
      ],
    })
    // rebuild client to clear cache whenever user logs in or out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isLoggedIn])

  if (!client) {
    return null
  }

  const closeIntroModal = () => dispatch(['setIsIntroModalOpen', false])

  return (
    <AuthContext.Provider
      value={{ ...state, login, signup, closeIntroModal, logout: _logout }}
    >
      <UrqlProvider value={client}>{children}</UrqlProvider>
    </AuthContext.Provider>
  )
}

/**
 * Wrapper hook so that we don't need to import AuthContext
 * Can add extra status properties here
 */
function useAuth() {
  const context = useContext(AuthContext)
  const isAuthenticated = context.barista
  return {
    ...context,
    isAuthenticated,
  }
}

export { AuthProvider, useAuth }
