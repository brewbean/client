import axios from 'axios'
import {
  createContext,
  useReducer,
  useContext,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import { useHistory, useLocation } from 'react-router-dom'
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
  logout,
} from 'helper/auth'
import { AUTH_API, GRAPHQL_API, VERIFY_API } from 'config'
import { GET_BARISTA } from 'queries'
import { updates, keys } from 'helper/cache'
import { print } from 'graphql'

const AuthContext = createContext()

const initialState = {
  token: null,
  tokenExpiry: null,
  barista: null,
  hasInit: false,
  verificationCompleted: false,
  isIntroModalOpen: false,
  isLoggedIn: false,
  isFetching: localStorage.getItem('hasLoggedIn') === 'yes',
}

function reducer(state, [type, payload]) {
  switch (type) {
    case 'completeVerification':
      return { ...state, verificationCompleted: true }
    case 'updateVerified':
      return { ...state, barista: { ...state.barista, is_verified: true } }
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
  const { addAlert, closeAlert, alerts } = useAlert()

  const [state, dispatch] = useReducer(reducer, initialState)

  const _logout = useCallback(
    async () => await logout(authOnlyPaths, history, pathname, dispatch),
    [authOnlyPaths, history, pathname]
  )

  // use after another page triggers email confirmation
  const setVerifiedStatus = useCallback(() => {
    dispatch(['updateVerified'])
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
        dispatch(['completeVerification'])
      } else {
        // in edge case that error refreshing token; force them to re-login
        // this guarantees that they will have a new token that has verified role
        await _logout()
      }
    }

    if (state.barista?.is_verified && !state.verificationCompleted) {
      console.log('here')
      getVerifiedToken()
    }
  }, [state.barista, state.verificationCompleted, _logout])

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
            })
          } else {
            const barista = data.data.barista[0]
            dispatch(['setBarista', barista])

            if (!barista.is_verified) {
              addAlert({
                type: alertType.INFO,
                header: 'Your account is unverified',
                message:
                  'Please check your email for a verification link. Check your junk emails as well in case it went there. You may also click the "Resend email" button below if you cannot find your email.',
                close: true,
                action: {
                  onClick: async (success, fail, load) => {
                    try {
                      load()
                      await axios.post(
                        VERIFY_API + '/resend',
                        { email: barista.email },
                        { withCredentials: true }
                      )
                      success()
                    } catch (e) {
                      fail()
                    }
                  },
                  buttonText: 'Resend email',
                  successMessage: 'Email sent!',
                  failMessage: 'Sending email failed. Please try again later.',
                },
              })
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
        logout: _logout,
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
  const isAuthenticated = context.barista
  return {
    ...context,
    isAuthenticated,
  }
}

export { AuthProvider, useAuth }
