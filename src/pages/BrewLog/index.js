import { Switch, Route, useRouteMatch } from 'react-router-dom'
import BrewLogs from './BrewLog'
import Create from './Create'
import Import from './Import'
import Edit from './Edit'
const BrewLog = (props) => {
  const { url } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={url}>
        <BrewLogs />
      </Route>
      <Route exact path={`${url}/new`}>
        <Create />
      </Route>
      <Route exact path={`${url}/import`}>
        {/* Change import to new, am just using this for now */}
        <Import />
      </Route>
      <Route path={`${url}/:id/edit`}>
        <Edit />
      </Route>
    </Switch>
  )
}

export default BrewLog
