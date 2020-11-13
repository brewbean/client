import { Route, Redirect } from 'react-router-dom';
import { useUser } from 'context/UserContext';

const RedirectRoute = ({ children, ifCond, goTo, ...rest }) => {
  let { isAuthenticated } = useUser();
  let check;
  if (ifCond === 'auth') {
    check = isAuthenticated;
  }
  return (
    <Route {...rest}>
      {
        check
          ? <Redirect to={goTo || '/login'} />
          : children
      }
    </Route>
  )
}

export default RedirectRoute;