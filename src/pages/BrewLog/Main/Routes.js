import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Detail from 'pages/BrewLog/Detail'
import Import from 'pages/BrewLog/Import'
import Edit from 'pages/BrewLog/Edit'

export default function Routes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        Main
      </Route>
      <Route exact path={`${path}/new`}>
        <Import />
      </Route>
      <Route exact path={`${path}/:id`}>
        <Detail />
      </Route>
      <Route exact path={`${path}/:id/edit`}>
        <Edit />
      </Route>
    </Switch>
  )
}
