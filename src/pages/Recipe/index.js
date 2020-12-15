import { Switch, Route, useRouteMatch } from 'react-router-dom'
import CreateBrew from 'components/BrewTrak/CreateBrew'
import StagePage from './StagePage'
import { useRecipe } from './useRecipe'

const RecipePage = (props) => {
  const { data: recipeData, handler } = useRecipe()
  let match = useRouteMatch()

  return (
    <Switch>
      <Route
        exact
        path={`${match.url}/new`}
        render={(props) => (
          <CreateBrew {...props} />
        )}
      />
      <Route
        path={`${match.url}/new/stage`}
        render={(props) => (
          <StagePage {...props} />
        )}
      />
    </Switch>
  )
}

export default RecipePage
