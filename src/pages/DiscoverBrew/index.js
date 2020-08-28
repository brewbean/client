import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Header from '../../components/Header';
import DiscoverBrew from '../../components/DiscoverBrew';
import DiscoverDetails from '../../components/DiscoverBrew/DiscoverDetails'
import { useDiscoverBean } from '../../components/DiscoverBrew/useDiscoverBean';
// import CreateBrew from '../../components/DiscoverBrew/CreateBrew';

const DiscoverBrewPage = props => {
  const { data, methods } = useDiscoverBean();
  let match = useRouteMatch();
  return (
    <div className='h-screen bg-white flex flex-col'>
      <Header />
      <div className="bg-gray-50 flex-1 flex items-stretch">
        <div className='max-w-7xl bg-pink w-full mx-auto p-4 sm:px-6 lg:px-8'>
        <Switch>
          <Route exact path={`${match.url}/`} render={props => <DiscoverBrew {...props} {...data} {...methods}/> } /> 
          <Route exact path={`${match.url}/details`} render={props => <DiscoverDetails {...props} {...data}/> } /> 
          {/* <Route path={`${match.url}/new`} render={props => <CreateBrew {...props} {...data} {...methods} />} /> */}
        </Switch>
          
        </div>
      </div>
    </div>
  )
}

export default DiscoverBrewPage;