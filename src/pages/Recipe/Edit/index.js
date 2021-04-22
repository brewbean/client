import { useAuth } from 'context/AuthContext'
import { Redirect, useParams } from 'react-router-dom'
import { GET_RECIPE } from 'queries/Recipe'
import { useQuery } from 'urql'
import Container from './Container'

export default function EditRecipe() {
  const params = useParams()
  const id = parseInt(params.id)
  const { isVerified, barista } = useAuth()

  const [{ data, fetching, error }] = useQuery({
    query: GET_RECIPE,
    variables: { id },
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... error: {error.message}</p>
  if (!data?.recipe_by_pk) return null

  // needs to be last or else it will always redirect because query is slower
  if (
    !isVerified ||
    data.recipe_by_pk.barista_id !== barista?.id ||
    data.recipe_by_pk.is_deleted
  )
    return <Redirect to={`/recipe/${id}`} />

  return <Container recipe={data.recipe_by_pk} />
}
