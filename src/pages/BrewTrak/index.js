import { Switch, Route, useRouteMatch } from 'react-router-dom'

import BrewTrak from 'components/BrewTrak'
import CreateBrew from 'components/BrewTrak/CreateBrew'
import EditBrew from 'components/BrewTrak/EditBrew'

const BrewTrakPage = () => {
  let { path } = useRouteMatch()
  return (
    // <div className='h-screen bg-white flex flex-col'>
    //   <div className="bg-gray-50 flex-1 flex items-stretch">
    //     <div className='max-w-7xl bg-pink w-full mx-auto p-4 sm:px-6 lg:px-8'>
    //       <Switch>
    //         <Route exact path={path} render={props => <BrewTrak {...props} {...data} {...methods} />} />
    //         <Route path={`${path}/new`} render={props => <CreateBrew {...props} {...data} {...methods} />} />
    //         <Route path={`${path}/:id/edit`} render={props => <EditBrew {...props} />} />
    //       </Switch>
    //     </div>
    //   </div>
    // </div>

    <Switch>
      <Route exact path={path}>
        <BrewTrak />
      </Route>
      <Route path={`${path}/new`}>
        <CreateBrew />
      </Route>
      <Route
        path={`${path}/:id/edit`}
        render={(props) => <EditBrew {...props} />}
      />
    </Switch>
  )
}

export default BrewTrakPage
