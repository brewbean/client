import { Route } from 'react-router-dom'
import { Container } from 'components/Layout'

const ContainerRoute = ({ defaultLayout, config, children, ...rest }) => (
  <Route {...rest}>
    <Container defaultLayout={defaultLayout} config={config}>
      {children}
    </Container>
  </Route>
)

export default ContainerRoute
