import { useQuery } from 'urql'
import { GET_SINGLE_REVIEW } from 'queries'
import { useParams } from 'react-router-dom'
import EditRecipeReviewForm from './EditRecipeReviewForm'

const EditRecipeReview = (props) => {
  const { review_id } = useParams()
  const [reviewResult] = useQuery({
    query: GET_SINGLE_REVIEW,
    variables: { id: review_id },
  })
  const { data, fetching, error } = reviewResult

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... error: {error.message}</p>
  if (data?.bean_reviews_by_pk)
    return (
      <EditRecipeReviewForm
        beanReview={data.bean_reviews_by_pk}
        id={review_id}
      />
    )
  return null
}

export default EditRecipeReview
