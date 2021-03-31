import { useAuth } from 'context/AuthContext'
import { Redirect, useParams } from 'react-router-dom'
import { GET_SINGLE_BREW_LOG } from 'queries'
import { useQuery } from 'urql'
import Container from 'pages/Recipe/Edit/Container'

const EditBrewLog = () => {
  const { id } = useParams()
  const { isVerified, barista } = useAuth()

  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_BREW_LOG,
    variables: { id },
  })
  console.log('IsVerified:', isVerified)
  console.log('Data:', data)
  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... error: {error.message}</p>
  if (!data?.brew_log_by_pk) return null

  // needs to be last or else it will always redirect because query is slower
  if (!isVerified || data?.brew_log_by_pk.barista.id !== barista?.id)
    return <Redirect to={`/brewlog`} />

  return <Container recipe={data.brew_log_by_pk.recipe} />
}

export default EditBrewLog
