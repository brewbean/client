import { useQuery } from 'urql'
import { GET_SINGLE_RECIPE } from 'queries'
import { Redirect, useParams } from 'react-router-dom'
import Edit from 'components/Recipe/Edit'
import { useAuth } from 'context/AuthContext'

const EditRecipe = () => {
  const { id } = useParams()
  const { isVerified, barista } = useAuth()

  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_RECIPE,
    variables: { id },
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... error: {error.message}</p>

  if (!data?.recipes_by_pk) return null

  if (!isVerified || data?.recipes_by_pk.barista_id !== barista?.id)
    return <Redirect to={`/recipe/${id}`} />

  return <Edit recipe={data.recipes_by_pk} id={id} />
}

export default EditRecipe
