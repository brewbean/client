import React, { useState, useContext, useEffect, createContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AUTH_API, GUEST_TOKEN } from '../config';
import { getTokenFromRefresh } from '../helper';

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

  // URQL authExchange option
  // https://formidable.com/open-source/urql/docs/advanced/authentication/#configuring-getauth-initial-load-fetch-from-storage
  const getAuth = ({ authState }) => {
    const hasLoggedIn = window.localStorage.getItem('hasLoggedIn') === 'yes';

    // hasLoggedIn == false -> guest 
    // authState truthy -> logged in correctly
    if (!hasLoggedIn || authState) {
      return { token: state.token }
    }
    // you were logged in another tab but first time loading site (no authState & hasLoggedIn)
    // or you failed request -> authState false
    const { ok, token, tokenExpiry, barista } = await getTokenFromRefresh();

    if (!ok) {  // failed refreshing
      await logout();
      history.replace('/login');
    } else {  // got a new refresh
      setState({ ...state, token, tokenExpiry, barista });
      return { token };
    }
  }

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(AUTH_API + '/login', { email, password })

      window.localStorage.setItem('hasLoggedIn', 'yes');
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
    await axios.post(AUTH_API + '/logout');

    // to support logging out from all windows
    window.localStorage.setItem('hasLoggedIn', 'no');
    window.localStorage.setItem('logout', Date.now());
  }

  return (
    <UserContext.Provider value={{ ...state, login, logout, getAuth }}>
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