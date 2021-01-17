import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Recipes from 'components/Recipe'
import RecipeDetails from 'components/Recipe/RecipeDetails'
import CreateRecipeReview from 'components/Recipe/CreateRecipeReview'
import StagePage from './StagePage'

const RecipePage = (props) => {
  let match = useRouteMatch()

  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={(props) => <Recipes {...props} />}
      />
      <Route
        path={`${match.url}/details/:id`}
        render={(props) => <RecipeDetails {...props} />}
      />
      <Route
        exact
        path={`${match.url}/new`}
        render={(props) => <Recipes {...props} />}
        // render={(props) => <CreateBrew {...props} />}
      />
      <Route
        path={`${match.url}/:id/review/new`}
        render={(props) => <CreateRecipeReview {...props} />}
      />
      <Route
        path={`${match.url}/new/stage`}
        render={(props) => <StagePage {...props} />}
      />
    </Switch>
  )
}

export default RecipePage
