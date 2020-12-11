import axios from 'axios'
import { matchPath } from 'react-router-dom'
import { AUTH_API } from 'config'

export const logout = async (authOnlyPaths, history, pathname, dispatch) => {
  const isAuthOnlyPath = authOnlyPaths.find(({ path, exact, strict }) =>
    matchPath(pathname, {
      path,
      exact,
      strict,
    })
  )

  // remove refresh token cookie
  await axios.post(AUTH_API + '/logout', { withCredentials: true })

  // This is to support logging out from all windows
  // if 'hasLoggedIn' has a value then this means they haven't
  // cleared the localStorage and triggered all logouts yet
  // Conditional check to prevent bouncing logouts off tabs
  if (localStorage.getItem('hasLoggedIn')) {
    localStorage.setItem('logout', Date.now())
    localStorage.clear()
  }

  if (isAuthOnlyPath) {
    history.replace('/login')
  }

  dispatch(['logout'])
  console.log('%cLogged out!', 'color:purple')
}

export const getTokenFromRefresh = async () => {
  try {
    const { status, data } = await axios.post(
      AUTH_API + '/refresh-token',
      null,
      { withCredentials: true }
    )
    if (status === 200) {
      return {
        ok: true,
        token: data.token,
        tokenExpiry: data.tokenExpiry,
      }
    }
    return { ok: false }
  } catch (err) {
    return { ok: false }
  }
}

/**
 * authExchange options that doesn't require knowledge of AuthContext
 */
export const addAuthToOperation = ({ authState, operation }) => {
  if (!authState || !authState.token) {
    return operation
  }
  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {}
  return {
    ...operation,
    context: {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${authState.token}`,
        },
      },
    },
  }
}

export const didAuthError = ({ error }) => {
  const hasError = error.graphQLErrors.some(
    (e) => e.extensions?.code === 'invalid-jwt'
  )
  return hasError
}

export const willAuthError = ({ authState }) =>
  !authState ||
  new Date().getTime() >= new Date(authState.tokenExpiry).getTime()

// {
//   "errors": [
//     {
//       "extensions": {
//         "path": "$",
//         "code": "invalid-jwt"
//       },
//       "message": "Could not verify JWT: JWTExpired"
//     }
//   ]
// }
