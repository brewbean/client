import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Recipes from './Recipe'
import CreateRecipe from './CreateRecipe'
import EditRecipe from './EditRecipe'
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
        <CreateRecipe />
      </Route>
      <Route exact path={`${url}/:id`}>
        <Detail />
      </Route>
      <Route path={`${url}/:id/edit`}>
        <EditRecipe />
      </Route>
      <Route path={`${url}/:id/player`}>
        <Player />
      </Route>
    </Switch>
  )
}

export default RecipePage
