import { Switch } from 'react-router-dom';
import { AuthRoute, RedirectRoute, ContainerRoute } from 'navigation';

import { NotFound } from 'components/Utility';
import { NewUserModal } from 'components/Modal';
import PourGuide from 'pages/PourGuide';
import BrewTrakPage from 'pages/BrewTrak';
import DiscoverBeanPage from 'pages/DiscoverBean';
import Recipe from 'pages/Recipe';
import Login from 'pages/Login';
import CreateAccount from 'pages/CreateAccount';

const Test = () => {
  return (
    <div className='bg-gray-200'>
      Test page
    </div>
  )
}
const PathTest = () => {
  return (
    <div className='bg-gray-200'>
      Path Test
    </div>
  )
}

function App() {
  return (
    <Switch>
      <ContainerRoute exact path='/'>
        <Test />
        <NewUserModal />
      </ContainerRoute>
      <RedirectRoute
        path='/login'
        ifCond='auth'
        goTo='/'
        header={false}
        flexCol={false}
        paddedContent={false}
        alert={false}
      >
        <Login />
      </RedirectRoute>
      <RedirectRoute
        path='/create-account'
        ifCond='auth'
        goTo='/'
        header={false}
        flexCol={false}
        paddedContent={false}
        alert={false}
      >
        <CreateAccount />
      </RedirectRoute>
      <AuthRoute path='/test/:id'>
        <Test />
      </AuthRoute>
      <ContainerRoute path='/hi/:id/name/:slug'>
        <PathTest />
      </ContainerRoute>
      <ContainerRoute path='/pour-app'>
        <PourGuide />
      </ContainerRoute>
      <ContainerRoute path='/recipe'>
        <Recipe />
      </ContainerRoute>
      <ContainerRoute path='/brewtrak'>
        <BrewTrakPage />
      </ContainerRoute>
      <ContainerRoute path='/discover/bean'>
        <DiscoverBeanPage />
      </ContainerRoute>
      <ContainerRoute path='*'>
        <NotFound />
      </ContainerRoute>
    </Switch>
  )
}

export default App;