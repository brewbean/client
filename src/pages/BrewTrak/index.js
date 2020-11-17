import { Switch, Route, useRouteMatch } from 'react-router-dom';

import BrewTrak from 'components/BrewTrak';
import CreateBrew from 'components/BrewTrak/CreateBrew';
import Alert from 'components/Alert';
import { useBrewTrak } from 'components/BrewTrak/useBrewTrak';

const BrewTrakPage = props => {
  const { data, methods } = useBrewTrak();
  let { path } = useRouteMatch();

  return (
    <div className="bg-gray-50 flex-1 flex items-stretch">
      <div className='max-w-7xl bg-pink w-full mx-auto p-4 sm:px-6 lg:px-8'>
        <Alert containerStyle='mb-4 space-y-2' />
        <Switch>
          <Route exact path={path} render={props => <BrewTrak {...props} {...data} {...methods} />} />
          <Route path={`${path}/new`} render={props => <CreateBrew {...props} {...data} {...methods} />} />
        </Switch>
      </div>
    </div>
  )
}

export default BrewTrakPage;