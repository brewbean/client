import { useQuery } from 'urql'
import { GET_SINGLE_REVIEW } from 'queries'
import { useParams } from 'react-router-dom'
import EditBeanReviewForm from './EditBeanReviewForm'

const EditBeanReview = (props) => {
  const { review_id } = useParams()
  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_REVIEW,
    variables: { id: review_id },
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... error: {error.message}</p>
  if (data?.bean_review_by_pk)
    return (
      <EditBeanReviewForm beanReview={data.bean_review_by_pk} id={review_id} />
    )
  return null
}

export default EditBeanReview
