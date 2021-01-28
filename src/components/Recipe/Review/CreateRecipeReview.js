import { useState } from 'react'
import { useQuery, useMutation } from 'urql'
import { GET_SINGLE_RECIPE, INSERT_RECIPE_REVIEW_ONE } from 'queries'
import InputRow from 'components/InputRow'
import { useAuth } from 'context/AuthContext'
import { useHistory, useParams } from 'react-router-dom'

const CreateRecipeReview = (props) => {
  const history = useHistory()
  const [state, setState] = useState({
    rating: '5.0',
    comment: '',
  })
  const { id } = useParams()
  const { barista } = useAuth()
  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_RECIPE,
    variables: { id },
  })
  const [, insertRecipeReview] = useMutation(INSERT_RECIPE_REVIEW_ONE)

  const onChangeGenerator = (attr) => (e) => {
    setState({
      ...state,
      [attr]: e.target.value,
    })
  }

  const submitReview = async () => {
    await insertRecipeReview({
      object: {
        barista_id: barista.id,
        recipe_id: id,
        rating: state.rating,
        comment: state.comment,
      },
    })
    history.push(`/recipe/${id}`)
  }

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>
  const { name } = data.recipes_by_pk

  return (
    <div>
      <div className='font-bold'>Create Review</div>
      <InputRow
        value={barista.display_name}
        readOnly
        placeholder='Enter Barista'
        label='Barista'
      />
      <InputRow
        value={name}
        readOnly
        placeholder='Enter Recipe'
        label='Recipe'
      />
      <InputRow
        value={state.rating}
        onChange={onChangeGenerator('rating')}
        placeholder='Enter Rating'
        label='Rating'
      />
      <InputRow
        value={state.comment}
        onChange={onChangeGenerator('comment')}
        placeholder='Enter Comment'
        label='Comment'
      />
      <button
        type='button'
        onClick={submitReview}
        className='mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
      >
        submit review
      </button>
    </div>
  )
}

export default CreateRecipeReview
