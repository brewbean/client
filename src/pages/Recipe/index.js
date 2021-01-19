import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Recipes from 'components/Recipe'
import RecipeDetails from 'components/Recipe/RecipeDetails'
import CreateRecipeReview from 'components/Recipe/CreateRecipeReview'
import StagePage from './StagePage'

const RecipePage = (props) => {
  const { url } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={url}>
        <Recipes />
      </Route>
      <Route exact path={`${url}/:id`}>
        <RecipeDetails />
      </Route>
      <Route path={`${url}/new`}>
        <Recipes /> {/*this needs to be CreateRecipe*/}
      </Route>
      <Route exact path={`${url}/:id/review/new`}>
        <CreateRecipeReview />
      </Route>
      <Route path={`${url}/new/stage`}>
        <StagePage />
      </Route>
    </Switch>
  )
}

export default RecipePage
