import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Detail from './Detail'
import Main from './Main'

const BeanPage = () => {
  const { url } = useRouteMatch()
  return (
    <Switch>
      <Route exact path={url}>
        <Main />
      </Route>
      <Route exact path={`${url}/:id`}>
        <Detail />
      </Route>
    </Switch>
  )
}

export default BeanPage
