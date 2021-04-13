import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { Container } from 'components/Layout'
import Detail from 'pages/BrewLog/Detail'
import Create from 'pages/BrewLog/Create'
import Edit from 'pages/BrewLog/Edit'
import MobileWelcome from './MobileWelcome'

const Card = ({ children }) => (
  <div className='bg-white rounded-lg px-4 py-5'>{children}</div>
)

export default function Mobile({ fetching, error, data, goToCreate }) {
  const { path } = useRouteMatch()

  return (
    <Container>
      <Switch>
        <Route exact path={path}>
          <MobileWelcome {...{ fetching, error, data, goToCreate }} />
        </Route>
        <Route exact path={`${path}/new`}>
          <Card>
            <Create />
          </Card>
        </Route>
        <Route exact path={`${path}/:id`}>
          <Card>
            <Detail />
          </Card>
        </Route>
        <Route exact path={`${path}/:id/edit`}>
          <Card>
            <Edit />
          </Card>
        </Route>
      </Switch>
    </Container>
  )
}
