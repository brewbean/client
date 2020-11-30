import { useState, useContext, useEffect, createContext } from 'react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import { AUTH_API } from 'config';
import { useAlert, alertType } from './AlertContext';
import { useClient } from 'urql';

import { GET_BARISTA } from 'queries'
import { FAILED, PENDING, SUCCESS } from 'constants/status';
import { logout } from 'helper/auth';

const UserContext = createContext();

/**
 * authPaths equal array of path names that are authenticated ['/profile'] 
 * causes failed refreshes to go to login page
 * otherwise just continue to guest version of page
 */
const UserProvider = ({ setToken, setTokenExpiry, setIsLoggedIn, token, isLoggedIn, authOnlyPaths, children }) => {
  const client = useClient();
  const history = useHistory();
  const { pathname } = useLocation();
  const { addAlert } = useAlert();

  const [barista, setBarista] = useState(null);
  const [status, setStatus] = useState(localStorage.getItem('hasLoggedIn') === 'yes' ? PENDING : SUCCESS);

  useEffect(() => {
    const syncLogout = async (event) => {
      if (event.key === 'logout') {
        await _logout();
      }
    }
    window.addEventListener('storage', syncLogout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getBarista = async () => {
      if (isLoggedIn) {
        try {
          const { data, error } = await client.query(GET_BARISTA).toPromise();
          const barista = data.barista[0];

          if (error) {
            addAlert({ type: alertType.ERROR, header: error.name, message: error.message });
            setStatus(FAILED);
          } else {
            setBarista(barista);
            setStatus(SUCCESS);
          }
        } catch (e) {
          console.log(e.message);
        }
      }
    }
    getBarista();
  }, [isLoggedIn, addAlert, client, token]);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(AUTH_API + '/login', { email, password }, { withCredentials: true })

      setToken(data.token);
      setTokenExpiry(data.tokenExpiry);

      window.localStorage.setItem('hasLoggedIn', 'yes');
      history.push('/');
    } catch ({ response }) {
      addAlert({ type: alertType.ERROR, header: response.data.message, message: 'Please retry logging in' });
    }
  }

  const _logout = async () => {
    await logout(authOnlyPaths, history, pathname, setToken, setTokenExpiry, setIsLoggedIn);
  }

  return (
    <UserContext.Provider value={{ login, logout: _logout, barista, status }}>
      {children}
    </UserContext.Provider>
  )
}

/**
 * Wrapper hook so that we don't need to import UserContext
 * Can add extra status properties here
 */
const useUser = () => {
  const context = useContext(UserContext);
  const isSuccess = context.status === SUCCESS;
  const isPending = context.status === PENDING;
  const isAuthenticated = context.barista && isSuccess;

  return {
    ...context,
    isAuthenticated,
    isPending,
  };
}

export { UserProvider, useUser }