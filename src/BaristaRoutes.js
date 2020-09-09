import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useUser } from './context/userContext'
import Login from './pages/Login';

const BaristaRoutes = () => {
  const { isAuthenticated } = useUser();
  return (
    <Switch>
      <Route path='/login' render={props => isAuthenticated ? <Redirect {...props} to='/' /> : <Login {...props} />} />
    </Switch>
  )
}

export default BaristaRoutes;