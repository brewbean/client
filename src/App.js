import { Switch, Redirect, useLocation } from 'react-router-dom'
import { AuthRoute, RedirectRoute, ContainerRoute } from 'navigation'

import { NotFound } from 'components/Utility'
import { NewUserModal } from 'components/Modal'
import Home from 'pages/Home'
import Recipe from 'pages/Recipe'
import Login from 'pages/Login'
import CreateAccount from 'pages/CreateAccount'
import Activate from 'pages/Activate'
import Profile from 'pages/Profile'
import ModalFlowDemo from 'pages/ModalFlowDemo'
import Reset from 'pages/Reset'
import StageForm from 'components/StageForm'
import Guide from 'pages/Guide'

const Test = () => {
  return <div className='bg-gray-200'>Test page</div>
}
const PathTest = () => {
  return <div className='bg-gray-200'>Path Test</div>
}

function App() {
  const { pathname, search } = useLocation()
  return (
    <Switch>
      <Redirect from='/:url*(/+)' to={pathname.slice(0, -1) + search} />
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
      <ContainerRoute
        path='/reset'
        defaultLayout={false}
        config={{
          flexCol: true,
          layout: true,
          paddedContent: true,
          layoutClass: 'flex',
        }}
      >
        <Reset />
      </ContainerRoute>
      <AuthRoute path='/profile'>
        <Profile />
      </AuthRoute>
      <AuthRoute path='/test/:id'>
        <Test />
      </AuthRoute>
      <ContainerRoute path='/modal-test'>
        <ModalFlowDemo />
      </ContainerRoute>
      <ContainerRoute path='/hi/:id/name/:slug'>
        <PathTest />
      </ContainerRoute>
      <ContainerRoute path='/form'>
        <StageForm />
      </ContainerRoute>
      <ContainerRoute path='/recipe'>
        <Recipe />
      </ContainerRoute>
      <ContainerRoute path='/guide'>
        <Guide />
      </ContainerRoute>
      <ContainerRoute path='*'>
        <NotFound />
      </ContainerRoute>
    </Switch>
  )
}

export default App
