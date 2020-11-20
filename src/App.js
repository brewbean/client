import { Switch } from 'react-router-dom';
import { createClient, Provider as UrqlProvider, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { devtoolsExchange } from '@urql/devtools';

import { GRAPHQL_API } from 'config'
import { AuthRoute, RedirectRoute, ContainerRoute } from 'navigation';
import { useUser } from 'context/UserContext';
import { addAuthToOperation } from 'helper/auth';

import { NotFound } from 'components/Utility';
import PourGuide from 'pages/PourGuide';
import BrewTrakPage from 'pages/BrewTrak';
import DiscoverBeanPage from 'pages/DiscoverBean';
import Recipe from 'pages/Recipe';
import Login from 'pages/Login';
import CreateAccount from 'pages/CreateAccount';

function App() {
  const { getAuth, didAuthError, barista } = useUser();

  const client = createClient({
    url: GRAPHQL_API,
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange,
      authExchange({
        getAuth,
        addAuthToOperation,
        didAuthError,
      }),
      fetchExchange,
    ],
  });

  const Test = () => (
    <div className='bg-gray-200'>
      email: {barista.email}
      name: {barista.displayName}
    </div>
  )
  const PathTest = () => {
    return (
      <div className='bg-gray-200'>
        Path Test
      </div>
    )
  }

  return (
    <UrqlProvider value={client}>
      <Switch>
        <ContainerRoute exact path='/'>
          <BrewTrakPage />
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
    </UrqlProvider>
  );
}

export default App;
