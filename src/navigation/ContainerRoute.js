import { Route } from 'react-router-dom';
import { Container } from 'components/Layout';

const ContainerRoute = ({ header, flexCol, children, ...rest }) => (
  <Route {...rest}>
    <Container header={header} flexCol={flexCol}>
      {children}
    </Container>
  </Route>
)

export default ContainerRoute;