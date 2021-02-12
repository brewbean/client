import axios from 'axios'
import {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import {
  createClient,
  Provider as UrqlProvider,
  dedupExchange,
  fetchExchange,
} from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'
import { devtoolsExchange } from '@urql/devtools'
import { authExchange } from '@urql/exchange-auth'

import { useAlert, alertType } from './AlertContext'
import {
  addAuthToOperation,
  didAuthError,
  getTokenFromRefresh,
  willAuthError,
  logoutAPI,
} from 'helper/auth'
import { AUTH_API, GRAPHQL_API } from 'config'
import { GET_BARISTA } from 'queries'
import { updates, keys } from 'helper/cache'
import { print } from 'graphql'
import { useHistory, useLocation } from 'react-router-dom'
import { createUnverifiedAlert } from 'helper/auth'

const AuthContext = createContext()

const initialState = {
  token: null,
  tokenExpiry: null,
  barista: null,
  hasInit: false,
  fetchVerifyToken: false,
  isIntroModalOpen: false,
  isLoggedIn: false,
  isFetching: localStorage.getItem('hasLoggedIn') === 'yes',
}

function reducer(state, [type, payload]) {
  switch (type) {
    case 'fetchVerifyToken':
      return { ...state, fetchVerifyToken: payload }
    case 'updateVerified':
      return {
        ...state,
        barista: { ...state.barista, is_verified: true },
      }
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

function AuthProvider({ children }) {
  const { addAlert, closeAlert, alerts } = useAlert()

  const [state, dispatch] = useReducer(reducer, initialState)

  const history = useHistory()
  const location = useLocation()

  const logout = useCallback(async () => {
    await logoutAPI()
    dispatch(['logout'])
    history.push('/')
    console.log('%cLogged out!', 'color:purple')
  }, [history])

  // use after another page triggers email confirmation
  const setVerifiedStatus = useCallback(() => {
    dispatch(['updateVerified'])
    dispatch(['fetchVerifyToken', true])
    const removeIndex = alerts.findIndex(
      (a) => a.header === 'Your account is unverified'
    )
    if (removeIndex > -1) {
      closeAlert(removeIndex)
    }
  }, [alerts, closeAlert])

  useEffect(() => {
    const initialize = async () => {
      if (localStorage.getItem('hasLoggedIn') === 'yes') {
        const { ok, token, tokenExpiry } = await getTokenFromRefresh()
        if (ok) {
          dispatch(['setJWT', { token, tokenExpiry }])
          dispatch(['login'])
        } else {
          await logout()
        }
      }
    }

    // This is only called from tabs that are passively listening
    // to logout, thus all they need is to dispatch action as
    // localstorage is cleared & cookie is cleared for them in
    // the active tab
    const syncLogout = (event) => {
      if (event.key === 'logout') {
        dispatch(['logout'])
        history.push('/')
        console.log('%cLogged out!', 'color:pink')
      }
    }
    initialize()
    window.addEventListener('storage', syncLogout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const syncVerification = async (event) => {
      if (event.key === 'verified' && state.isLoggedIn) {
        setVerifiedStatus()
      }
    }
    window.addEventListener('storage', syncVerification)
    return () => window.removeEventListener('storage', syncVerification)
  }, [state.barista, state.isLoggedIn, setVerifiedStatus])

  useEffect(() => {
    const getVerifiedToken = async () => {
      const { ok, token, tokenExpiry } = await getTokenFromRefresh()
      if (ok) {
        dispatch(['setJWT', { token, tokenExpiry }])
        dispatch(['fetchVerifyToken', false]) // marks completing verification
      } else {
        // in edge case that error refreshing token; force them to re-login
        // this guarantees that they will have a new token that has verified role
        await logout()
      }
    }

    if (state.fetchVerifyToken) {
      getVerifiedToken()
    }
  }, [state.fetchVerifyToken, logout])

  useEffect(() => {
    const getBarista = async () => {
      if (state.isLoggedIn && !state.hasInit) {
        try {
          dispatch(['setIsFetching', true])

          const { data } = await axios.post(
            GRAPHQL_API,
            { query: print(GET_BARISTA) },
            { headers: { authorization: `Bearer ${state.token}` } }
          )

          if (data.errors) {
            const error = data.errors[0]
            addAlert({
              type: alertType.ERROR,
              header: error.extensions.code,
              message: error.message,
              close: true,
            })
          } else {
            const barista = data.data.barista[0]
            dispatch(['setBarista', barista])

            if (!barista.is_verified && location.pathname !== '/profile') {
              addAlert(createUnverifiedAlert(barista.email))
            }
          }

          dispatch(['finishInitBarista'])
          dispatch(['setIsFetching', false])
        } catch (e) {
          console.error(e.message)
        }
      }
    }
    getBarista()
  }, [
    state.isLoggedIn,
    state.token,
    state.hasInit,
    addAlert,
    location.pathname,
  ])

  const login = async (email, password, callback) => {
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

      if (callback) callback()
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

  const signup = async ({ email, displayName, password }, callback) => {
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

      if (callback) callback()
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
    await logout()
    return null
  }

  const client = useMemo(() => {
    return createClient({
      url: GRAPHQL_API,
      exchanges: [
        devtoolsExchange,
        dedupExchange,
        cacheExchange({ updates, keys }),
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
      value={{
        ...state,
        login,
        signup,
        setVerifiedStatus,
        closeIntroModal,
        logout,
      }}
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
  const isAuthenticated = context.barista !== null
  const isVerified = isAuthenticated && context.barista.is_verified
  return {
    ...context,
    isAuthenticated,
    isVerified,
  }
}

export { AuthProvider, useAuth }
