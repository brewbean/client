import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';
import { AUTH_API } from '../config';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    barista: {
      email: null,
      displayName: null,
    },
    token: null,
    tokenExpiry: null,
    status: 'success',
    error: null,
  })



  const login = async (email, password) => {
    try {
      const { data } = await axios.post(AUTH_API + '/auth/login', { email, password })
      console.log('LOGIN DATA:', data);

      setState({
        ...state,
        status: 'success',
        token: data.token,
        tokenExpiry: data.tokenExpiry,
        barista: {
          email: data.email,
          displayName: data.displayName,
        }
      })
    } catch ({ message }) {
      setState({
        ...state,
        status: 'failed',
        error: message
      });
    }
  }

  const logout = () => { }

  return (
    <UserContext.Provider value={{ ...state, login, logout }}>
      {state.status === 'pending' ? '...loading' : children}
    </UserContext.Provider>
  )
}

/**
 * Wrapper hook so that we don't need to import UserContext
 * Can add extra status properties here
 */
const useUser = () => {
  const context = useContext(UserContext);
  return context;
}

export { UserProvider, useUser }