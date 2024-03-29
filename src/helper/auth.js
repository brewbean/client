import axios from 'axios'
import { AUTH_API, VERIFY_API } from 'config'
import { alertType } from 'context/AlertContext'

export const createUnverifiedAlert = (email) => ({
  type: alertType.INFO,
  header: 'Your account is unverified',
  message:
    'Currently you cannot access all features due to being unverified. Please check your email for a verification link. You may also click the "Resend email" button below if you cannot find your email.',
  close: true,
  action: {
    onClick: async (success, fail, load) => {
      try {
        load()
        await axios.post(
          VERIFY_API + '/resend',
          { email },
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

export const logoutAPI = async () => {
  // This is to support logging out from all windows
  // triggers logout action in other tabs
  localStorage.setItem('logout', Date.now())
  localStorage.clear()

  // remove refresh token cookie
  await axios.post(AUTH_API + '/logout', null, { withCredentials: true })
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
