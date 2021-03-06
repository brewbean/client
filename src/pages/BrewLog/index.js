import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Create from './Create'

const BrewLogPage = (props) => {
  const { url } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={`${url}/new`}>
        <Create />
      </Route>
    </Switch>
  )
}

export default BrewLogPage
