import { Route } from 'react-router-dom';
import { Container } from 'components/Layout';

const ContainerRoute = ({ noLayout, config, children, ...rest }) => (
  <Route {...rest}>
    <Container noLayout={noLayout} config={config}>
      {children}
    </Container>
  </Route>
)

export default ContainerRoute;