import ContainerRoute from './ContainerRoute'
import { useAuth } from 'context/AuthContext'
import { Loading } from 'components/Utility'
import { LoginFauxModal } from 'components/Auth'

const AuthRoute = ({ children, ...rest }) => {
  let { isFetching, isAuthenticated } = useAuth()

  return (
    <ContainerRoute {...rest}>
      {isFetching ? (
        <Loading />
      ) : isAuthenticated ? (
        children
      ) : (
        <LoginFauxModal />
      )}
    </ContainerRoute>
  )
}

export default AuthRoute
