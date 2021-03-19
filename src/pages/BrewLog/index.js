import { Switch, Route, useRouteMatch } from 'react-router-dom'
import BrewLogs from './BrewLog'
import Create from './Create'
import Import from './Import'

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
        <Import />
      </Route>
    </Switch>
  )
}

export default BrewLog
