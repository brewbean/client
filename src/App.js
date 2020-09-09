import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/BrewTrak/';
import { UserProvider } from './context/userContext';

import PourGuide from './pages/PourGuide';
import BrewTrakPage from './pages/BrewTrak';
import DiscoverBeanPage from './pages/DiscoverBean';
import Recipe from './pages/Recipe';
import BaristaRoutes from './BaristaRoutes';

function App() {
  return (
    <>
      {/* NON-USER EXPERIENCE */}
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/pour-app' component={PourGuide} />
        <Route path='/recipe' component={Recipe} />
        <Route path = '/brewtrak' component={BrewTrakPage} />
        <Route path = '/discover/bean' component={DiscoverBeanPage} />

      </Switch>
      {/* USER EXPERIENCE */}
      <UserProvider>
        <BaristaRoutes />
      </UserProvider>
    </>
  );
}

export default App;
