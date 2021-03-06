import { Switch, Redirect, useLocation } from 'react-router-dom'
import { AuthRoute, RedirectRoute, ContainerRoute } from 'navigation'
import { NewUserModal } from 'components/Modal'
import Home from 'pages/Home'
import Recipe from 'pages/Recipe'
import BrewLog from 'pages/BrewLog'
import Login from 'pages/Login'
import CreateAccount from 'pages/CreateAccount'
import Activate from 'pages/Activate'
import Profile from 'pages/Profile'
import Reset from 'pages/Reset'
import Guide from 'pages/Guide'
import { About, Contact, PrivacyPolicy, Terms, NotFound } from 'pages/Content'

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
      <ContainerRoute path='/about'>
        <About />
      </ContainerRoute>
      <ContainerRoute path='/contact-us'>
        <Contact />
      </ContainerRoute>
      <ContainerRoute path='/privacy'>
        <PrivacyPolicy />
      </ContainerRoute>
      <ContainerRoute path='/terms'>
        <Terms />
      </ContainerRoute>
      <ContainerRoute path='/recipe'>
        <Recipe />
      </ContainerRoute>
      <ContainerRoute path='/brewlog'>
        <BrewLog />
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
