import axios from 'axios';
import { AUTH_API } from '../config';

export const getTokenFromRefresh = async () => {
  try {
    const { status, data } = await axios.post(AUTH_API + '/refresh-token', null, { withCredentials: true });
    if (status === 200) {
      return {
        ok: true,
        token: data.token,
        tokenExpiry: data.tokenExpiry,
        barista: {
          email: data.email,
          displayName: data.displayName,
        },
      }
    }
    return { ok: false };
  } catch (err) {
    console.error(err);
    return { ok: false };
  }
}

/**
 * authExchange options that doesn't require knowledge of userContext
 */
export const addAuthToOperation = ({
  authState,
  operation,
}) => {
  if (!authState || !authState.token) {
    return operation;
  }
  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};
  return {
    ...operation,
    context: {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          "Authorization": `Bearer ${authState.token}`,
        },
      },
    },
  };
}

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
export const didAuthError = ({ error }) => error.graphQLErrors.some(e => e.extensions?.code === 'invalid-jwt');
