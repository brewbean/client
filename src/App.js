import { useState, useEffect, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { createClient, Provider as UrqlProvider, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { devtoolsExchange } from '@urql/devtools';

import { GRAPHQL_API } from 'config'
import { UserProvider } from 'context/UserContext';
import { addAuthToOperation, didAuthError, getTokenFromRefresh, logout } from 'helper/auth';

import Routes from './Routes';

/**
 * Any path that only supports being authenticated (ex. /profile/jimmy)
 * Behavior -> if logged out, these routes will go to login
 * The alternative is a page that still works when you are not logged in (guest mode available)
 */
const authOnlyPaths = [
  { path: '/test/:id' },
];

function App() {
  const history = useHistory();
  const { pathname } = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);

  // auto login if user has a refreshToken
  useEffect(() => {
    const initialize = async () => {
      if (localStorage.getItem('hasLoggedIn') === 'yes') {
        const { ok, ...data } = await getTokenFromRefresh();
        if (ok) {
          setToken(data.token);
          setTokenExpiry(data.tokenExpiry);
          setIsLoggedIn(true);
        } else {
          await logout(authOnlyPaths, history, pathname, setToken, setTokenExpiry, setIsLoggedIn);
        }
      }
    }
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const client = useMemo(() => {
    return createClient({
      url: GRAPHQL_API,
      exchanges: [
        devtoolsExchange,
        dedupExchange,
        cacheExchange,
        authExchange({
          getAuth: async ({ authState }) => {
            if (!authState) {
              if (token) {
                console.log("HERE (1) - token:", token.slice(-6));
                return { token };
              }
              console.log('INITIALIZED')
              return null;
            }
            const { ok, ...data } = await getTokenFromRefresh();

            if (ok) {
              setToken(data.token);
              setTokenExpiry(data.tokenExpiry);
              return {
                token: data.token,
                tokenExpiry: data.tokenExpiry
              }
            }

            // This is where auth has gone wrong and we need to clean up and redirect to a login page
            //  LOGOUT STUFF
            await logout(authOnlyPaths, history, pathname, setToken, setTokenExpiry, setIsLoggedIn);

            return null;
          },
          willAuthError: () => {
            if (tokenExpiry) {
              return new Date().getTime() >= new Date(tokenExpiry).getTime();
            }
            return false;
          },
          addAuthToOperation,
          didAuthError,
        }),
        fetchExchange,
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  if (!client) {
    return null;
  }

  return (
    <UrqlProvider value={client}>
      <UserProvider
        authOnlyPaths={authOnlyPaths}
        setToken={setToken}
        setTokenExpiry={setTokenExpiry}
        setIsLoggedIn={setIsLoggedIn}
        token={token}
        isLoggedIn={isLoggedIn}
      >
        <Routes />
      </UserProvider>
    </UrqlProvider>
  );
}

export default App;
