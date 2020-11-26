import { Switch, Route, useRouteMatch } from 'react-router-dom';

import DiscoverBean from 'components/DiscoverBean';
import DiscoverDetails from 'components/DiscoverBean/DiscoverDetails'
import CreateReview from 'components/DiscoverBean/CreateReview'
import EditReview from 'components/DiscoverBean/EditReview'
import { useDiscoverBean } from 'components/DiscoverBean/useDiscoverBean';
// import CreateBean from 'components/DiscoverBean/CreateBean';

const DiscoverBeanPage = props => {
  const { data, methods } = useDiscoverBean();
  let match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.url}/`} render={props => <DiscoverBean {...props} {...data} {...methods} />} />
      <Route path={`${match.url}/details/:id`} render={props => <DiscoverDetails {...props} />} />
      <Route path={`${match.url}/review/:id/new`} render={props => <CreateReview {...props} />} />
      <Route path={`${match.url}/review/:id/edit`} render={props => <EditReview {...props} />} />

      {/* <Route path={`${match.url}/new`} render={props => <CreateBean {...props} {...data} {...methods} />} /> */}
    </Switch>
  )
}

export default DiscoverBeanPage;