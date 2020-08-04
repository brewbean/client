import React, { useState } from 'react';
import Header from '../../components/Header';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import StagePage from './Stage';
import CreateBrew from '../../components/BrewTrak/CreateBrew';
import { useBrewTrak } from '../../components/BrewTrak/useBrewTrak';

const DemoPage = props => {
  let [stages, setStages] = useState(['test'])
  let match = useRouteMatch();
  const { data, methods } = useBrewTrak();

  return (
    <div className='h-screen flex flex-col'>
      <Header />
      <Switch>
        <Route exact path={`${match.url}/new`} render={props => <CreateBrew {...props} {...data} {...methods} />} />
        <Route path={`${match.url}/new/stage`} render={props => <StagePage {...props} stages={stages} setStages={setStages} />} />
      </Switch>
    </div>
  )
}

export default DemoPage;