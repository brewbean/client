import { useEffect } from 'react'
import {
  Route,
  Switch,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom'
import { useAlert, alertType } from 'context/AlertContext'
import Detail from 'pages/BrewLog/Detail'
import Create from 'pages/BrewLog/Create'
import Edit from 'pages/BrewLog/Edit'
import { Loading } from 'components/Utility'
import Welcome from './Welcome'

export default function Routes({ fetching }) {
  const { path } = useRouteMatch()
  const { state } = useLocation()
  const history = useHistory()
  const { addAlert } = useAlert()

  useEffect(() => {
    if (state?.createdBrewLog) {
      addAlert({
        type: alertType.SUCCESS,
        header: 'Brew log successfully created!',
        close: true,
      })
      history.replace(path + '/' + state.id, {})
    }
  }, [addAlert, state, history, path])

  if (fetching) return <Loading defaultPadding={false} containerClass='p-4' />

  return (
    <Switch>
      <Route exact path={path}>
        <Welcome />
      </Route>
      <Route exact path={`${path}/new`}>
        <Create />
      </Route>
      <Route exact path={`${path}/:id`}>
        <Detail />
      </Route>
      <Route exact path={`${path}/:id/edit`}>
        <Edit />
      </Route>
    </Switch>
  )
}
