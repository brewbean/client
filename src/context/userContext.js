import React, { useState, useContext, useEffect, createContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AUTH_API, GUEST_TOKEN } from '../config';

const INIT_STATE = {
  barista: {
    email: null,
    displayName: null,
  },
  token: GUEST_TOKEN,
  tokenExpiry: null,
  status: 'success',
  error: null,
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const history = useHistory();

  const [state, setState] = useState(INIT_STATE);

  useEffect(() => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        history.push('/login')
      }
    }
    window.addEventListener('storage', syncLogout)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(AUTH_API + '/login', { email, password })

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
    } catch ({ response }) {
      setState({
        ...state,
        status: 'failed',
        error: response.data.message
      });
    }
  }

  const logout = async () => {
    // change in-memory token back to guest
    setState(INIT_STATE);

    // remove refresh token cookie
    await axios.post(AUTH_API + '/logout', null, { withCredentials: true });

    // to support logging out from all windows
    window.localStorage.setItem('logout', Date.now());
  }

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
  const isSuccess = context.status === 'success';
  const isAuthenticated = context.barista.email && isSuccess;
  return {
    ...context,
    isAuthenticated
  };
}

export { UserProvider, useUser }