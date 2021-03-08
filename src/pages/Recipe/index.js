import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Recipes from './Recipe'
import Create from './Create'
import Edit from './Edit'
import Player from './Player'
import Detail from './Detail'

const RecipePage = (props) => {
  const { url } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={url}>
        <Recipes />
      </Route>
      <Route exact path={`${url}/new`}>
        <Create />
      </Route>
      <Route exact path={`${url}/:id`}>
        <Detail />
      </Route>
      <Route path={`${url}/:id/edit`}>
        <Edit />
      </Route>
      <Route path={`${url}/:id/player`}>
        <Player />
      </Route>
    </Switch>
  )
}

export default RecipePage
