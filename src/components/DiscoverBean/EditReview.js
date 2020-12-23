import { useQuery } from 'urql'
import { GET_SINGLE_REVIEW } from 'queries'
import { useParams } from 'react-router-dom'
import EditReviewForm from './EditReviewForm'

const EditReview = (props) => {
  const { id } = useParams()
  const [reviewResult] = useQuery({
    query: GET_SINGLE_REVIEW,
    variables: { id },
  })
  const { data, fetching, error } = reviewResult

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... error: {error.message}</p>
  if (data?.bean_reviews_by_pk)
    return <EditReviewForm beanReview={data.bean_reviews_by_pk} id={id} />
  return null
}

export default EditReview
