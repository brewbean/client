import { useState, useContext, useEffect, useMemo, createContext } from 'react';
import axios from 'axios';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { AUTH_API } from 'config';
import { useAlert, alertType } from './AlertContext';
import { SUCCESS, PENDING, FAILED } from 'constants/status';
import { useQuery } from 'urql';

const INIT_STATE = {
  barista: {
    id: null,
    email: null,
    displayName: null,
    avatar: null,
  },
  token: null,
  tokenExpiry: null,
  status: SUCCESS,
};

const UserContext = createContext();

/**
 * authPaths equal array of path names that are authenticated ['/profile'] 
 * causes failed refreshes to go to login page
 * otherwise just continue to guest version of page
 */
const UserProvider = ({ authOnlyPaths, token, setToken, setTokenExpiry, children }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { addAlert } = useAlert();

  const [state, setState] = useState(INIT_STATE);

  const [result] = useQuery({
    query: `
      query {
       barista { 
          display_name
          avatar
        }
      }
    `,
    pause: token === null,
    context: useMemo(() => ({
      fetchOptions: {
        headers: {
          "x-hasura-role": "guest"
        }
      }
    }), [])
  });

  const { data, fetching, error } = result;

  useEffect(() => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        const isAuthOnlyPath = authOnlyPaths.find(({ path, exact, strict }) => matchPath(pathname, {
          path,
          exact,
          strict
        }));
        console.log('logged out from storage!');
        if (isAuthOnlyPath) {
          history.push('/login');
        }
      }
    }
    window.addEventListener('storage', syncLogout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(AUTH_API + '/login', { email, password }, { withCredentials: true })

      window.localStorage.setItem('hasLoggedIn', 'yes');

      setToken(data.token);
      setTokenExpiry(data.tokenExpiry);
      // setState({
      //   ...state,
      //   status: SUCCESS,
      //   token: data.token,
      //   tokenExpiry: data.tokenExpiry,
      //   barista: {
      //     id: data.id,
      //     email: data.email,
      //     displayName: data.displayName,
      //     avatar: data.avatar,
      //   }
      // })
    } catch ({ response }) {
      setState({ ...state, status: FAILED });
      addAlert({ type: alertType.ERROR, header: response.data.message, message: 'Please retry logging in' });
    }
  }

  const logout = async () => {
    const isAuthOnlyPath = authOnlyPaths.find(({ path, exact, strict }) => matchPath(pathname, {
      path,
      exact,
      strict
    }));

    // remove refresh token cookie
    await axios.post(AUTH_API + '/logout', { withCredentials: true });

    // to support logging out from all windows
    window.localStorage.setItem('logout', Date.now());
    window.localStorage.clear();

    if (isAuthOnlyPath) {
      history.replace('/login');
    }
    // change in-memory token back to guest; in case they do not want to re-login
    setState(INIT_STATE);
  }

  return (
    <UserContext.Provider value={{ ...state, fetching, token, error, login, logout }}>
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
  const isSuccess = !context.fetching && !context.error;
  const isPending = context.fetching;
  const isAuthenticated = context.token && !context.error && isSuccess;

  return {
    ...context,
    isAuthenticated,
    isPending,
  };
}

export { UserProvider, useUser }