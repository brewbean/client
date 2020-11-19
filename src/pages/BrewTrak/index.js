import { Switch, Route, useRouteMatch } from 'react-router-dom';

import BrewTrak from 'components/BrewTrak';
import CreateBrew from 'components/BrewTrak/CreateBrew';
import { useBrewTrak } from 'components/BrewTrak/useBrewTrak';

const BrewTrakPage = () => {
  const { data, methods } = useBrewTrak();
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <BrewTrak {...data} {...methods} />
      </Route>
      <Route path={`${path}/new`}>
        <CreateBrew {...data} {...methods} />
      </Route>
    </Switch>
  )
}

export default BrewTrakPage;