import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Detail from './Detail'
import Main from './Main'
import Create from './Create'
import Edit from './Edit'

const BeanPage = () => {
  const { url } = useRouteMatch()
  return (
    <Switch>
      <Route exact path={url}>
        <Main />
      </Route>
      <Route exact path={`${url}/new`}>
        <Create />
      </Route>
      <Route exact path={`${url}/:id`}>
        <Detail />
      </Route>
      <Route exact path={`${url}/:id/edit`}>
        <Edit />
      </Route>
    </Switch>
  )
}

export default BeanPage
