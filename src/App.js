import { useEffect } from 'react'
import { Switch, Redirect, Route, useLocation } from 'react-router-dom'
import { load, trackPageview } from 'fathom-client'
import { FATHOM_ID } from 'config'
import { AuthRoute, ContainerRoute, RedirectIf } from 'navigation'
import { NewUserModal } from 'components/Modal'
import Home from 'pages/Home'
import Recipe from 'pages/Recipe'
import Login from 'pages/Login'
import CreateAccount from 'pages/CreateAccount'
import Activate from 'pages/Activate'
import Profile from 'pages/Profile'
import Reset from 'pages/Reset'
import Guide from 'pages/Guide'
import { About, Contact, PrivacyPolicy, Terms, NotFound } from 'pages/Content'
import BrewLog from 'pages/BrewLog'
import BeanPage from 'pages/Bean'
import Cafe from 'pages/Cafe'

load(FATHOM_ID, {
  excludedDomains: ['localhost'],
})

function App() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    trackPageview()
  }, [pathname, search])

  return (
    <Switch>
      <Redirect from='/:url*(/+)' to={pathname.slice(0, -1) + search} />
      <ContainerRoute exact path='/'>
        <Home />
        <NewUserModal />
      </ContainerRoute>
      <Route path='/login'>
        <RedirectIf cond='isLoggedIn' goTo='/'>
          <Login />
        </RedirectIf>
      </Route>
      <Route path='/create-account'>
        <RedirectIf cond='isLoggedIn' goTo='/'>
          <CreateAccount />
        </RedirectIf>
      </Route>
      <Route path='/activate'>
        <Activate />
      </Route>
      <Route path='/reset'>
        <Reset />
      </Route>
      <AuthRoute path='/profile'>
        <Profile />
      </AuthRoute>
      <ContainerRoute path='/cafe/:slug'>
        <Cafe />
      </ContainerRoute>
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
      <Route path='/brewlog'>
        <BrewLog />
      </Route>
      <ContainerRoute path='/bean'>
        <BeanPage />
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
