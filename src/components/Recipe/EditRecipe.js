import { useQuery } from 'urql'
import { GET_SINGLE_RECIPE } from 'queries'
import { useParams } from 'react-router-dom'
import EditRecipeForm from './EditRecipeForm'

const EditRecipe = (props) => {
  const { id } = useParams()
  const [result] = useQuery({
    query: GET_SINGLE_RECIPE,
    variables: { id },
  })
  const { data, fetching, error } = result

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... error: {error.message}</p>
  if (data?.recipes_by_pk)
    return <EditRecipeForm recipe={data.recipes_by_pk} id={id} />
  return null
}

export default EditRecipe
