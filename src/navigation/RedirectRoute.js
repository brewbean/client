import { Redirect } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import ContainerRoute from './ContainerRoute'

const RedirectRoute = ({ children, ifCond, goTo, ...rest }) => {
  let { isAuthenticated } = useAuth()
  let check
  if (ifCond === 'auth') {
    check = isAuthenticated
  }
  return (
    <ContainerRoute {...rest}>
      {check ? <Redirect to={goTo || '/login'} /> : children}
    </ContainerRoute>
  )
}

export default RedirectRoute
