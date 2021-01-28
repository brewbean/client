import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Bean from 'components/Bean'
import BeanDetails from 'components/Bean/BeanDetails'
import CreateBeanReview from 'components/Bean/Review/CreateBeanReview'
import EditBeanReview from 'components/Bean/Review/EditBeanReview'

const BeanPage = (props) => {
  const { url } = useRouteMatch()
  return (
    <Switch>
      <Route exact path={`${url}/`} render={(props) => <Bean {...props} />} />
      <Route
        exact
        path={`${url}/:id`}
        render={(props) => <BeanDetails {...props} />}
      />
      <Route
        path={`${url}/:id/review/new`}
        render={(props) => <CreateBeanReview {...props} />}
      />
      <Route
        exact
        path={`${url}/:id/review/:review_id/edit`}
        render={(props) => <EditBeanReview {...props} />}
      />
    </Switch>
  )
}

export default BeanPage
