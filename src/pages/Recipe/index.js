import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Header from 'components/Header';
import CreateBrew from 'components/BrewTrak/CreateBrew';
import { useBrewTrak } from 'components/BrewTrak/useBrewTrak';
import StagePage from './StagePage';
import { useRecipe } from './useRecipe';

const RecipePage = props => {
  const { data: recipeData, handler } = useRecipe();
  const { data: brewTrakData, methods } = useBrewTrak();
  let match = useRouteMatch();

  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <Switch>
        <Route exact path={`${match.url}/new`} render={props => <CreateBrew {...props} {...brewTrakData} {...methods} />} />
        <Route path={`${match.url}/new/stage`} render={props => <StagePage {...props} {...recipeData} {...handler} />} />
      </Switch>
    </div>
  )
}

export default RecipePage;