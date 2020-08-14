import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Header from '../../components/Header';
import BrewTrak from '../../components/BrewTrak';
import { useBrewTrak } from '../../components/BrewTrak/useBrewTrak';
import CreateBrew from '../../components/BrewTrak/CreateBrew';

const BrewTrakPage = props => {
  const { data, methods } = useBrewTrak();
  let match = useRouteMatch();

  return (
    <div className='h-screen bg-white flex flex-col'>
      <Header />
      <div className="bg-gray-50 flex-1 flex items-stretch">
        <div className='max-w-7xl bg-pink w-full mx-auto p-4 sm:px-6 lg:px-8'>
        <Switch>
          <Route exact path={`${match.url}/`} render={props => <BrewTrak {...props} {...data} {...methods}/> } /> 
          <Route path={`${match.url}/new`} render={props => <CreateBrew {...props} {...data} {...methods} />} />
        </Switch>
          
        </div>
      </div>
    </div>
  )
}

export default BrewTrakPage;