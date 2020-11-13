import ContainerRoute from './ContainerRoute';
import { useUser } from 'context/UserContext';
import { Loading, Unauthorized } from 'components/Utility';

const AuthRoute = ({ children, ...rest }) => {
  let { isPending, isAuthenticated, needRefresh } = useUser();
  
  return (
    <ContainerRoute {...rest}>
      {
        needRefresh || isPending
          ? <Loading />
          : isAuthenticated
            ? children
            : <Unauthorized />
      }
    </ContainerRoute>
  )
}

export default AuthRoute;