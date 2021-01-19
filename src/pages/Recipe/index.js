import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Recipes from 'components/Recipe'
import RecipeDetails from 'components/Recipe/RecipeDetails'
import CreateRecipeReview from 'components/Recipe/CreateRecipeReview'
import StagePage from './StagePage'

const RecipePage = (props) => {
  const { url } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={url} render={(props) => <Recipes {...props} />} />
      <Route
        exact
        path={`${url}/:id`}
        render={(props) => <RecipeDetails {...props} />}
      />
      <Route
        path={`${url}/new`}
        render={(props) => <Recipes {...props} />}
        // render={(props) => <CreateBrew {...props} />}
      />
      <Route
        exact
        path={`${url}/:id/review/new`}
        render={(props) => <CreateRecipeReview {...props} />}
      />
      <Route
        path={`${url}/new/stage`}
        render={(props) => <StagePage {...props} />}
      />
    </Switch>
  )
}

export default RecipePage
