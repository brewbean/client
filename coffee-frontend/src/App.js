import React from 'react';
import {Switch, Route} from 'react-router-dom';
import BrewTrakHome from './components/BrewTrak/BrewTrakHome';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={BrewTrakHome} />
    </Switch>
  );
}

export default App;
