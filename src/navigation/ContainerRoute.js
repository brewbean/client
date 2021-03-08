import { Route } from 'react-router-dom'
import { Container } from 'components/Layout'

const ContainerRoute = ({ children, ...rest }) => (
  <Route {...rest}>
    <Container>{children}</Container>
  </Route>
)

export default ContainerRoute
