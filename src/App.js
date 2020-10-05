import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createClient, Provider, defaultExchanges } from 'urql';
import { devtoolsExchange } from '@urql/devtools';

import { GRAPHQL_API } from './config'
import { useUser } from './context/userContext';

import PourGuide from './pages/PourGuide';
import BrewTrakPage from './pages/BrewTrak';
import DiscoverBeanPage from './pages/DiscoverBean';
import Recipe from './pages/Recipe';
import Login from './pages/Login';

function App() {
  const { token, isAuthenticated } = useUser();

  const client = createClient({
    url: GRAPHQL_API,
    exchanges: [devtoolsExchange, ...defaultExchanges],
    fetchOptions: () => ({
      headers: { authorization: `Bearer ${token}` },
    }),
  });

  return (
    <Provider value={client}>
      <Switch>
        <Route exact path='/' component={BrewTrakPage} />
        <Route path='/login' render={props => isAuthenticated ? <Redirect {...props} to='/' /> : <Login {...props} />} />
        <Route path='/pour-app' component={PourGuide} />
        <Route path='/recipe' component={Recipe} />
        <Route path='/brewtrak' component={BrewTrakPage} />
        <Route path='/discover/bean' component={DiscoverBeanPage} />
      </Switch>
    </Provider>
  );
}

export default App;
