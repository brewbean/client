import ContainerRoute from './ContainerRoute';
import { useAuth } from 'context/AuthContext';
import { Loading, Unauthorized } from 'components/Utility';

const AuthRoute = ({ children, ...rest }) => {
  let { isFetching, isAuthenticated } = useAuth();
  
  return (
    <ContainerRoute {...rest}>
      {
        isFetching
          ? <Loading />
          : isAuthenticated
            ? children
            : <Unauthorized />
      }
    </ContainerRoute>
  )
}

export default AuthRoute;