import { Switch, Route, useRouteMatch } from 'react-router-dom'
import DiscoverBean from 'components/DiscoverBean'
import DiscoverDetails from 'components/DiscoverBean/DiscoverDetails'
import CreateReview from 'components/DiscoverBean/CreateReview'
import EditReview from 'components/DiscoverBean/EditReview'

const DiscoverBeanPage = (props) => {
  let match = useRouteMatch()
  return (
    <Switch>
      <Route
        exact
        path={`${match.url}/`}
        render={(props) => <DiscoverBean {...props} />}
      />
      <Route
        exact
        path={`${match.url}/:id`}
        render={(props) => <DiscoverDetails {...props} />}
      />
      <Route
        path={`${match.url}/:id/review/new`}
        render={(props) => <CreateReview {...props} />}
      />
      <Route
        path={`${match.url}/review/:id/edit`}
        render={(props) => <EditReview {...props} />}
      />
    </Switch>
  )
}

export default DiscoverBeanPage
