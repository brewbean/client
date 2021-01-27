import { Route } from 'react-router-dom'
import { Container } from 'components/Layout'

const ContainerRoute = ({
  alertDisabled,
  defaultLayout,
  config,
  children,
  ...rest
}) => (
  <Route {...rest}>
    <Container
      alertDisabled={alertDisabled}
      defaultLayout={defaultLayout}
      config={config}
    >
      {children}
    </Container>
  </Route>
)

export default ContainerRoute
