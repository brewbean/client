import { useQuery } from 'urql'
import { GET_SINGLE_RECIPE_REVIEW } from 'queries'
import { useParams } from 'react-router-dom'
import EditRecipeReviewForm from './EditRecipeReviewForm'

const EditRecipeReview = (props) => {
  const { review_id } = useParams()
  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_RECIPE_REVIEW,
    variables: { id: review_id },
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... error: {error.message}</p>
  if (data?.recipe_reviews_by_pk)
    return (
      <EditRecipeReviewForm
        recipeReview={data.recipe_reviews_by_pk}
        id={review_id}
      />
    )
  return null
}

export default EditRecipeReview
