import { Redirect } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'

export default function RedirectIf({ cond, goTo, children }) {
  let { isAuthenticated, isFetching } = useAuth()
  let check

  if (cond === 'isLoggedIn') {
    check = isAuthenticated
  }

  return isFetching ? null : check ? (
    <Redirect to={goTo || '/login'} />
  ) : (
    children
  )
}
