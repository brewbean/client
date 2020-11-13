import { Redirect } from 'react-router-dom';
import { useUser } from 'context/UserContext';
import ContainerRoute from './ContainerRoute';

const RedirectRoute = ({ children, ifCond, goTo, ...rest }) => {
  let { isAuthenticated } = useUser();
  let check;
  if (ifCond === 'auth') {
    check = isAuthenticated;
  }
  return (
    <ContainerRoute {...rest}>
      {
        check
          ? <Redirect to={goTo || '/login'} />
          : children
      }
    </ContainerRoute>
  )
}

export default RedirectRoute;