import { GET_SINGLE_BREW_LOG } from 'queries'
import { useQuery } from 'urql'
import { useParams } from 'react-router-dom'
import EditBrewForm from './EditBrewForm'

const EditBrew = () => {
  const { id } = useParams()
  const [result] = useQuery({
    query: GET_SINGLE_BREW_LOG,
    variables: { id },
  })
  const { data, fetching, error } = result
  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>
  if (data?.recipe_by_pk) {
    return <EditBrewForm id={id} recipe={data.recipe_by_pk} />
  }
  return null
}

export default EditBrew
