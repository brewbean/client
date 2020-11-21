import { useState, useContext, useEffect, createContext } from 'react';
import axios from 'axios';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import { AUTH_API, GUEST_TOKEN } from 'config';
import { useAlert, alertType } from './AlertContext';
import { SUCCESS, PENDING, FAILED } from 'constants/status';
import { getTokenFromRefresh } from 'helper/auth';

const INIT_STATE = {
  barista: {
    id: null,
    email: null,
    displayName: null,
    avatar: null,
  },
  token: GUEST_TOKEN,
  tokenExpiry: null,
  status: PENDING,
  error: null,
  needRefresh: false,
};

const UserContext = createContext();

/**
 * authPaths equal array of path names that are authenticated ['/profile'] 
 * causes failed refreshes to go to login page
 * otherwise just continue to guest version of page
 */
const UserProvider = ({ authOnlyPaths, children }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { addAlert } = useAlert();

  const [state, setState] = useState(INIT_STATE);

  useEffect(() => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        const isAuthOnlyPath = authOnlyPaths.find(({ path, exact, strict }) => matchPath(pathname, {
          path,
          exact,
          strict
        }));

        console.log('logged out from storage!');

        if (state.barista.email) {
          setState(INIT_STATE);
        }
        if (isAuthOnlyPath) {
          history.push('/login');
        }
      }
    }
    window.addEventListener('storage', syncLogout)
    if (window.localStorage.getItem('hasLoggedIn') === 'yes') {
      setState({
        ...state,
        status: SUCCESS,
        needRefresh: true,
      });
    } else {
      setState({ ...state, status: SUCCESS });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const didAuthError = ({ error }) => {
    const hasError = error.graphQLErrors.some(e => e.extensions?.code === 'invalid-jwt');
    if (hasError) {
      setState({ ...state, needRefresh: hasError });
    }
    return hasError;
  }

  /**
   * getAuth runs on: 
   * -> start
   * -> auth error
   * 
   * https://formidable.com/open-source/urql/docs/advanced/authentication/#configuring-getauth-initial-load-fetch-from-storage
   */
  const getAuth = async ({ authState }) => {
    if (state.needRefresh) {
      const { ok, token, tokenExpiry, barista } = await getTokenFromRefresh();

      if (!ok) {  // failed refreshing
        await logout();
      } else {  // got a new refresh
        setState({ ...state, token, tokenExpiry, barista, needRefresh: false, status: SUCCESS });
        return { token };
      }
    } else {
      return { token: state.token }
    }
  }

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(AUTH_API + '/login', { email, password }, { withCredentials: true })

      window.localStorage.setItem('hasLoggedIn', 'yes');

      setState({
        ...state,
        status: SUCCESS,
        token: data.token,
        tokenExpiry: data.tokenExpiry,
        barista: {
          id: data.id,
          email: data.email,
          displayName: data.displayName,
          avatar: data.avatar,
        }
      })
    } catch ({ response }) {
      setState({
        ...state,
        status: FAILED,
        error: response.data.message
      });
      addAlert({ type: alertType.ERROR, header: response.data.message, message: 'Please retry logging in' })
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
    <UserContext.Provider value={{ ...state, login, logout, getAuth, didAuthError }}>
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
  const isAuthenticated = context.barista.email !== null && context.barista.email !== undefined && isSuccess;

  return {
    ...context,
    isAuthenticated,
    isPending,
  };
}

export { UserProvider, useUser }