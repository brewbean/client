import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Header from '../../components/Header';
import DiscoverBean from '../../components/DiscoverBean';
import DiscoverDetails from '../../components/DiscoverBean/DiscoverDetails'
import CreateReview from '../../components/DiscoverBean/CreateReview'
import { useDiscoverBean } from '../../components/DiscoverBean/useDiscoverBean';
// import CreateBean from '../../components/DiscoverBean/CreateBean';

const DiscoverBeanPage = props => {
  const { data, methods } = useDiscoverBean();
  let match = useRouteMatch();
  return (
    <div className='h-screen bg-white flex flex-col'>
      <Header />
      <div className="bg-gray-50 flex-1 flex items-stretch">
        <div className='max-w-7xl bg-pink w-full mx-auto p-4 sm:px-6 lg:px-8'>
        <Switch>
          <Route exact path={`${match.url}/`} render={props => <DiscoverBean {...props} {...data} {...methods}/> } /> 
          <Route path = {`${match.url}/details/:id`} render={props => <DiscoverDetails {...props}/> } />
          <Route path = {`${match.url}/review/:id/new`} render={props => <CreateReview {...props}/> } />
          {/* <Route path={`${match.url}/new`} render={props => <CreateBean {...props} {...data} {...methods} />} /> */}
        </Switch>
          
        </div>
      </div>
    </div>
  )
}

export default DiscoverBeanPage;