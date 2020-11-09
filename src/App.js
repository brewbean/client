import { Switch, Route, Redirect } from 'react-router-dom';
import { createClient, Provider, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { devtoolsExchange } from '@urql/devtools';

import { GRAPHQL_API } from 'config'
import { useUser } from 'context/userContext';
import { addAuthToOperation } from 'helper/auth';

import PourGuide from 'pages/PourGuide';
import BrewTrakPage from 'pages/BrewTrak';
import DiscoverBeanPage from 'pages/DiscoverBean';
import Recipe from 'pages/Recipe';
import Login from 'pages/Login';

function App() {
  const { isAuthenticated, getAuth, didAuthError, barista } = useUser();

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

  return (
    <Provider value={client}>
      <Switch>
        <Route exact path='/' component={BrewTrakPage} />
        <Route path='/login' render={props => isAuthenticated ? <Redirect {...props} to='/' /> : <Login {...props} />} />
        <Route path='/pour-app' component={PourGuide} />
        <Route path='/recipe' component={Recipe} />
        <Route path='/test' render={props => isAuthenticated ? <Test /> : <div className='bg-pink-200 h-full'>401 Unauthorized</div>} />
        <Route path='/brewtrak' component={BrewTrakPage} />
        <Route path='/discover/bean' component={DiscoverBeanPage} />
      </Switch>
    </Provider>
  );
}

export default App;
