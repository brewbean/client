import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createClient, Provider } from 'urql';

import { GRAPHQL_API } from './config'
import { UserProvider, useUser } from './context/userContext';

import PourGuide from './pages/PourGuide';
import BrewTrakPage from './pages/BrewTrak';
import DiscoverBeanPage from './pages/DiscoverBean';
import Recipe from './pages/Recipe';
import BaristaRoutes from './BaristaRoutes';

function App() {
  const { token } = useUser();

  const client = createClient({
    url: GRAPHQL_API,
    fetchOptions: () => ({
      headers: { authorization: `Bearer ${token}` },
    }),
  });

  return (
    <Provider value={client}>
      <Router>
        {/* NON-USER EXPERIENCE */}
        <Switch>
          <Route exact path='/' component={BrewTrakPage} />
          <Route path='/pour-app' component={PourGuide} />
          <Route path='/recipe' component={Recipe} />
          <Route path='/brewtrak' component={BrewTrakPage} />
          <Route path='/discover/bean' component={DiscoverBeanPage} />

        </Switch>
        {/* USER EXPERIENCE */}
        <UserProvider>
          <BaristaRoutes />
        </UserProvider>
      </Router>
    </Provider>
  );
}

export default App;
