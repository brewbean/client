import React, { useState, useContext, useEffect, createContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AUTH_API, GUEST_TOKEN } from '../config';
import { getTokenFromRefresh } from '../helper/auth';

const INIT_STATE = {
  barista: {
    email: null,
    displayName: null,
  },
  token: GUEST_TOKEN,
  tokenExpiry: null,
  status: 'success',
  error: null,
  needRefresh: false,
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
    if (window.localStorage.getItem('hasLoggedIn') === 'yes') {
      setState({ ...state, needRefresh: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const didAuthError = ({ error }) => {
    console.log('Errors ->', error.graphQLErrors)
    const hasError = error.graphQLErrors.some(e => e.extensions?.code === 'invalid-jwt');
    console.log('hasError ->', hasError);
    if (hasError) setState({ ...state, needRefresh: hasError });
    return hasError;
  }

  // URQL authExchange option
  // https://formidable.com/open-source/urql/docs/advanced/authentication/#configuring-getauth-initial-load-fetch-from-storage
  const getAuth = async ({ authState }) => {
    console.log('needRefresh ->', state.needRefresh);
    if (state.needRefresh) {
      console.log('refreshing...');
      const { ok, token, tokenExpiry, barista } = await getTokenFromRefresh();
      console.log('new token! ->', token);
      if (!ok) {  // failed refreshing
        await logout();
      } else {  // got a new refresh
        setState({ ...state, token, tokenExpiry, barista, needRefresh: false });
        return { token };
      }
    } else {
      return { token: state.token }
    }
  }

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(AUTH_API + '/login', { email, password }, { withCredentials: true })
      console.log('login flow ->', data);
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
    // change in-memory token back to guest; in case they do not want to re-login
    setState(INIT_STATE);

    // remove refresh token cookie
    await axios.post(AUTH_API + '/logout');

    // to support logging out from all windows
    window.localStorage.setItem('logout', Date.now());
    window.localStorage.clear();
  }

  return (
    <UserContext.Provider value={{ ...state, login, logout, getAuth, didAuthError }}>
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
  console.log('isAuthenticated ->', isAuthenticated)
  return {
    ...context,
    isAuthenticated
  };
}

export { UserProvider, useUser }