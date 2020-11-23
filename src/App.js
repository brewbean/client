import { useState, useMemo } from 'react';
import { Switch, useHistory, useLocation, matchPath } from 'react-router-dom';
import { createClient, Provider as UrqlProvider, dedupExchange, cacheExchange, fetchExchange, useMutation } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { devtoolsExchange } from '@urql/devtools';
import axios from 'axios';

import { GRAPHQL_API, AUTH_API } from 'config'
import { AuthRoute, RedirectRoute, ContainerRoute } from 'navigation';
import { UserProvider } from 'context/UserContext';
import { addAuthToOperation, getTokenFromRefresh } from 'helper/auth';

import { NotFound } from 'components/Utility';
import PourGuide from 'pages/PourGuide';
import BrewTrakPage from 'pages/BrewTrak';
import DiscoverBeanPage from 'pages/DiscoverBean';
import Recipe from 'pages/Recipe';
import Login from 'pages/Login';
import CreateAccount from 'pages/CreateAccount';

/**
 * Any path that only supports being authenticated (ex. /profile/jimmy)
 * Behavior -> if logged out, these routes will go to login
 * The alternative is a page that still works when you are not logged in (guest mode available)
 */
const authOnlyPaths = [
  { path: '/test/:id' },
];

function App() {
  const [token, setToken] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);

  const history = useHistory();
  const { pathname } = useLocation();

  const client = createClient({
    url: GRAPHQL_API,
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange,
      authExchange({
        getAuth: async ({ authState }) => {
          if (!authState) {
            if (token) {
              console.log("HERE (1) - token:", token);
              return { token };
            }
            return null;
          }

          const { ok, ...data } = await getTokenFromRefresh();
          console.log("HERE (2) - token:", ok, data);
          if (ok) {
            setToken(data.token);
            setTokenExpiry(data.tokenExpiry);
            return { token: data.token }
          }
          // This is where auth has gone wrong and we need to clean up and redirect to a login page

          const isAuthOnlyPath = authOnlyPaths.find(({ path, exact, strict }) => matchPath(pathname, {
            path,
            exact,
            strict
          }));

          // remove refresh token cookie
          await axios.post(AUTH_API + '/logout', { withCredentials: true });

          // to support logging out from all windows
          window.localStorage.setItem('logout', Date.now());
          window.localStorage.clear();
          setToken(null);
          setTokenExpiry(null);

          if (isAuthOnlyPath) {
            history.replace('/login');
          }

          return null;
        },
        addAuthToOperation,
        didAuthError: ({ error }) => {
          const hasError = error.graphQLErrors.some(e => e.extensions?.code === 'invalid-jwt' || e.extensions?.code === 'validation-failed');
          console.log("HERE (3) - error:", error, hasError);
          return hasError;
        },
      }),
      fetchExchange,
    ],
  });

  console.log('rerender')

  const Test = () => {
    return (
      <div className='bg-gray-200'>
        Test page
      </div>
    )
  }
  const PathTest = () => {
    return (
      <div className='bg-gray-200'>
        Path Test
      </div>
    )
  }

  return (
    <UrqlProvider value={client}>
      <UserProvider
        token={token}
        setToken={setToken}
        setTokenExpiry={setTokenExpiry}
        authOnlyPaths={authOnlyPaths}
      >
        <Switch>
          <ContainerRoute exact path='/'>
            <Test />
          </ContainerRoute>
          <RedirectRoute
            path='/login'
            ifCond='auth'
            goTo='/'
            header={false}
            flexCol={false}
            paddedContent={false}
            alert={false}
          >
            <Login />
          </RedirectRoute>
          <RedirectRoute
            path='/create-account'
            ifCond='auth'
            goTo='/'
            header={false}
            flexCol={false}
            paddedContent={false}
            alert={false}
          >
            <CreateAccount />
          </RedirectRoute>
          <AuthRoute path='/test/:id'>
            <Test />
          </AuthRoute>
          <ContainerRoute path='/hi/:id/name/:slug'>
            <PathTest />
          </ContainerRoute>
          <ContainerRoute path='/pour-app'>
            <PourGuide />
          </ContainerRoute>
          <ContainerRoute path='/recipe'>
            <Recipe />
          </ContainerRoute>
          <ContainerRoute path='/brewtrak'>
            <BrewTrakPage />
          </ContainerRoute>
          <ContainerRoute path='/discover/bean'>
            <DiscoverBeanPage />
          </ContainerRoute>
          <ContainerRoute path='*'>
            <NotFound />
          </ContainerRoute>
        </Switch>
      </UserProvider>
    </UrqlProvider>
  );
}

export default App;
