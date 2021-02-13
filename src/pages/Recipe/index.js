import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Recipes from './Recipe'
import CreateRecipe from './CreateRecipe'
import EditRecipe from './EditRecipe'
import Player from './Player'
import Detail from './Detail'
// import CreateRecipeReview from './Review/CreateRecipeReview'
// import EditRecipeReview from './Review/EditRecipeReview'
// import StagePage from './StagePage'

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

      {/* <Route exact path={`${url}/:id/review/new`}>
        <CreateRecipeReview />
      </Route> */}
      {/* <Route exact path={`${url}/:id/review/:review_id/edit`}>
        <EditRecipeReview />
      </Route> */}
      {/* <Route path={`${url}/new/stage`}>
        <StagePage />
      </Route> */}
    </Switch>
  )
}

export default RecipePage
