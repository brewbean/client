import { useAuth } from 'context/AuthContext'
import { Redirect, useParams } from 'react-router-dom'
import { GET_SINGLE_BEAN } from 'queries'
import { useQuery } from 'urql'
import Container from './Container'

export default function EditBean() {
  const { id } = useParams()
  const { isVerified, barista } = useAuth()

  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_BEAN,
    variables: { id },
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... error: {error.message}</p>
  if (!data?.bean_by_pk) return null

  // needs to be last or else it will always redirect because query is slower
  if (!isVerified || data?.bean_by_pk.author?.id !== barista?.id)
    return <Redirect to={`/bean/${id}`} />

  return <Container bean={data.bean_by_pk} />
}
