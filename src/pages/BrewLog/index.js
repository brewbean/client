import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Create from './Create'
import Import from './Import'
import Main from './Main'

const BrewLog = (props) => {
  const { url } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={url}>
        <Main />
      </Route>
      <Route exact path={`${url}/new`}>
        <Create />
      </Route>
      <Route exact path={`${url}/import`}>
        {/* Change import to new, am just using this for now */}
        <Import />
      </Route>
    </Switch>
  )
}

export default BrewLog
