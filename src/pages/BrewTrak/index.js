import { Switch, Route, useRouteMatch } from 'react-router-dom'

import BrewTrak from 'components/BrewTrak'
import CreateBrew from 'components/BrewTrak/CreateBrew'
import EditBrew from 'components/BrewTrak/EditBrew'

const BrewTrakPage = () => {
  let { path } = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path}>
        <BrewTrak />
      </Route>
      <Route path={`${path}/new`}>
        <CreateBrew />
      </Route>
      <Route
        path={`${path}/:id/edit`}
        render={(props) => <EditBrew {...props} />}
      />
    </Switch>
  )
}

export default BrewTrakPage
