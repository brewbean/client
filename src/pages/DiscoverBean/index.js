import { Switch, Route, useRouteMatch } from 'react-router-dom'
import DiscoverBean from 'components/DiscoverBean'
import DiscoverDetails from 'components/DiscoverBean/DiscoverDetails'
import CreateReview from 'components/DiscoverBean/CreateReview'
import EditReview from 'components/DiscoverBean/EditReview'

const DiscoverBeanPage = (props) => {
  const { url } = useRouteMatch()
  return (
    <Switch>
      <Route
        exact
        path={`${url}/`}
        render={(props) => <DiscoverBean {...props} />}
      />
      <Route
        exact
        path={`${url}/:id`}
        render={(props) => <DiscoverDetails {...props} />}
      />
      <Route
        path={`${url}/:id/review/new`}
        render={(props) => <CreateReview {...props} />}
      />
      <Route
        exact
        path={`${url}/:id/review/:review_id/edit`}
        render={(props) => <EditReview {...props} />}
      />
    </Switch>
  )
}

export default DiscoverBeanPage
