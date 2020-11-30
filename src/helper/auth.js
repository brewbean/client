import axios from 'axios';
import { matchPath } from 'react-router-dom';
import { AUTH_API } from 'config';

export const logout = async (authOnlyPaths, history, pathname, setToken, setTokenExpiry, setIsLoggedIn) => {
  const isAuthOnlyPath = authOnlyPaths.find(({ path, exact, strict }) => matchPath(pathname, {
    path,
    exact,
    strict
  }));

  // remove refresh token cookie
  await axios.post(AUTH_API + '/logout', { withCredentials: true });

  // to support logging out from all windows
  localStorage.setItem('logout', Date.now());
  localStorage.clear();

  if (isAuthOnlyPath) {
    history.replace('/login');
  }

  setToken(null);
  setTokenExpiry(null);
  setIsLoggedIn(false); // must be last after clearing tokens and everything
}

export const getTokenFromRefresh = async () => {
  try {
    const { status, data } = await axios.post(AUTH_API + '/refresh-token', null, { withCredentials: true });
    if (status === 200) {
      return {
        ok: true,
        token: data.token,
        tokenExpiry: data.tokenExpiry,
        barista: {
          id: data.id,
          email: data.email,
          displayName: data.displayName,
          avatar: data.avatar,
        },
      }
    }
    return { ok: false };
  } catch (err) {
    console.log('ERROR GETTING REFRESH TOKEN:', err);
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

export const didAuthError = ({ error }) => {
  const hasError = error.graphQLErrors.some(e => e.extensions?.code === 'invalid-jwt');
  return hasError;
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
