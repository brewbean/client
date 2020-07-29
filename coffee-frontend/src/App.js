import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BrewTrakHome from './components/BrewTrak/BrewTrakHome';
import { UserProvider, useUser } from './context/userContext';
import Header from './components/Header';

function TestPage() {
  const { user } = useUser();
  return (
    <Header />
  )
}

function App() {
  return (
    <>
      {/* NON-USER EXPERIENCE */}
      <Switch>
        <Route exact path='/' component={BrewTrakHome} />
      </Switch>
      {/* USER EXPERIENCE */}
      <UserProvider>
        <Switch>
          <Route path='/test' component={TestPage} />
        </Switch>
      </UserProvider>
    </>
  );
}

export default App;
