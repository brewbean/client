import { Route } from 'react-router-dom';
import { Container } from 'components/Layout';

const ContainerRoute = ({ header, flexCol, paddedContent, alert, children, ...rest }) => (
  <Route {...rest}>
    <Container header={header} flexCol={flexCol} paddedContent={paddedContent} alert={alert}>
      {children}
    </Container>
  </Route>
)

export default ContainerRoute;