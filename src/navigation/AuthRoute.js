import { Route } from 'react-router-dom';
import { useUser } from 'context/UserContext';
import { Loading, Unauthorized } from 'components/Utility';

const PrivateRoute = ({ children, ...rest }) => {
  let { isPending, isAuthenticated, needRefresh } = useUser();
  
  return (
    <Route {...rest}>
      {
        needRefresh || isPending
          ? <Loading />
          : isAuthenticated
            ? children
            : <Unauthorized />
      }
    </Route>
  )
}

export default PrivateRoute;