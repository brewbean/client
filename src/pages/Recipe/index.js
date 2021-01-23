import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Recipes from 'components/Recipe'
import RecipeDetails from 'components/Recipe/RecipeDetails'
import CreateRecipe from 'components/Recipe/CreateRecipe'
import CreateRecipeReview from 'components/Recipe/CreateRecipeReview'
import EditRecipeReview from 'components/Recipe/EditRecipeReview'
import StagePage from './StagePage'

const RecipePage = (props) => {
  const { url } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={url}>
        <Recipes />
      </Route>
      <Route exact path={`${url}/new`}>
        <CreateRecipe /> {/*this needs to be CreateRecipe*/}
      </Route>
      <Route path={`${url}/:id`}>
        <RecipeDetails />
      </Route>

      <Route exact path={`${url}/:id/review/new`}>
        <CreateRecipeReview />
      </Route>
      <Route exact path={`${url}/:id/review/:review_id/edit`}>
        <EditRecipeReview />
      </Route>
      <Route path={`${url}/new/stage`}>
        <StagePage />
      </Route>
    </Switch>
  )
}

export default RecipePage
