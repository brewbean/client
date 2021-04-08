import { useAuth } from 'context/AuthContext'
import { Redirect, useParams } from 'react-router-dom'
import { GET_SINGLE_BREW_LOG } from 'queries'
import { useQuery } from 'urql'
import BrewLogEdit from 'pages/BrewLog/Edit/BrewLogEdit'
import FormNavigation from 'components/Form/Navigation'
import Decision from './Decision'
import NormalEdit from './NormalEdit'
import CopyEdit from './CopyEdit'

export const CONTAINER = 'CONTAINER'
export const RECIPE_DECISION = 'RECIPE_DECISION'
export const RECIPE_NORMAL_EDIT = 'RECIPE_NORMAL_EDIT'
export const RECIPE_COPY_EDIT = 'RECIPE_COPY_EDIT'
export const BREW_LOG_EDIT = 'BREW_LOG_EDIT'

const Edit = () => {
  const { id } = useParams()
  const { isVerified, barista } = useAuth()

  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_BREW_LOG,
    variables: { id: parseInt(id) },
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... error: {error.message}</p>
  if (!data?.brew_log_by_pk) return null

  const isRecipeAuthor = data.brew_log_by_pk.recipe.barista_id === barista?.id

  // needs to be last or else it will always redirect because query is slower
  if (!isVerified || data.brew_log_by_pk.barista.id !== barista?.id)
    return <Redirect to='/brewlog' />

  return (
    <FormNavigation
      defaultPath={isRecipeAuthor ? RECIPE_NORMAL_EDIT : RECIPE_DECISION}
      defaultPayload={{ isRecipeAuthor }}
      initialStore={{ brewLog: data.brew_log_by_pk }}
      routes={{
        [RECIPE_DECISION]: Decision,
        [RECIPE_NORMAL_EDIT]: NormalEdit,
        [RECIPE_COPY_EDIT]: CopyEdit,
        [BREW_LOG_EDIT]: BrewLogEdit,
      }}
    />
  )
}

export default Edit
