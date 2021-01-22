import { Switch } from 'react-router-dom'
import { AuthRoute, RedirectRoute, ContainerRoute } from 'navigation'

import { NotFound } from 'components/Utility'
import { NewUserModal } from 'components/Modal'
import Home from 'pages/Home'
import RecipePlayer from 'pages/RecipePlayer'
import BrewTrakPage from 'pages/BrewTrak'
import DiscoverBeanPage from 'pages/DiscoverBean'
import Recipe from 'pages/Recipe'
import Login from 'pages/Login'
import CreateAccount from 'pages/CreateAccount'
import Activate from 'pages/Activate'

const Test = () => {
  return <div className='bg-gray-200'>Test page</div>
}
const PathTest = () => {
  return <div className='bg-gray-200'>Path Test</div>
}

function App() {
  return (
    <Switch>
      <ContainerRoute exact path='/' config={{ paddedContent: false }}>
        <Home />
        <NewUserModal />
      </ContainerRoute>
      <RedirectRoute path='/login' ifCond='auth' goTo='/' defaultLayout={false}>
        <Login />
      </RedirectRoute>
      <RedirectRoute
        path='/create-account'
        ifCond='auth'
        goTo='/'
        defaultLayout={false}
      >
        <CreateAccount />
      </RedirectRoute>
      <ContainerRoute
        path='/activate'
        defaultLayout={false}
        config={{
          flexCol: true,
          layout: true,
          paddedContent: true,
          layoutClass: 'flex',
        }}
      >
        <Activate />
      </ContainerRoute>
      <AuthRoute path='/test/:id'>
        <Test />
      </AuthRoute>
      <ContainerRoute path='/hi/:id/name/:slug'>
        <PathTest />
      </ContainerRoute>
      <ContainerRoute path='/recipe-player'>
        <RecipePlayer />
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

export default App
