import { Switch, Route } from 'react-router-dom';
import { createClient, Provider, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { devtoolsExchange } from '@urql/devtools';

import { GRAPHQL_API } from 'config'
import { AuthRoute, RedirectRoute } from 'navigation';
import { useUser } from 'context/UserContext';
import { addAuthToOperation } from 'helper/auth';
import { HeaderLayout } from 'components/Layout'
import { NotFound } from 'components/Utility';

import PourGuide from 'pages/PourGuide';
import BrewTrakPage from 'pages/BrewTrak';
import DiscoverBeanPage from 'pages/DiscoverBean';
import Recipe from 'pages/Recipe';
import Login from 'pages/Login';

function App() {
  const { getAuth, didAuthError, barista } = useUser();

  const client = createClient({
    url: GRAPHQL_API,
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange,
      authExchange({
        getAuth,
        addAuthToOperation,
        didAuthError,
      }),
      fetchExchange,
    ],
  });

  const Test = () => (
    <div className='bg-gray-200'>
      email: {barista.email}
      name: {barista.displayName}
    </div>
  )
  const PathTest = () => {
    
    return (
      <div className='bg-gray-200'>
        Path Test
      </div>
    )
  }

  return (
    <Provider value={client}>
      <Switch>
        <RedirectRoute path='/login' ifCond='auth' goTo='/' >
          <Login />
        </RedirectRoute>

      </Switch>
      <HeaderLayout>
        <Switch>
          <Route exact path='/'>
            <BrewTrakPage />
          </Route>
          <Route path='/hi/:id/name/:slug'>
            <PathTest />
          </Route>
          <AuthRoute path='/test'>
            <Test />
          </AuthRoute>
          <Route path='/pour-app'>
            <PourGuide />
          </Route>
          <Route path='/recipe'>
            <Recipe />
          </Route>
          <Route path='/brewtrak'>
            <BrewTrakPage />
          </Route>
          <Route path='/discover/bean'>
            <DiscoverBeanPage />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </HeaderLayout>
    </Provider>
  );
}

export default App;
