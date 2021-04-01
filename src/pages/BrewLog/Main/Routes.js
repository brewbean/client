import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Detail from 'pages/BrewLog/Detail'

export default function Routes() {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        Main
      </Route>
      <Route path={`${path}/:id`}>
        <Detail />
      </Route>
    </Switch>
  )
}
