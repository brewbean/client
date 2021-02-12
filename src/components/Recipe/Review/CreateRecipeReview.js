import { useState } from 'react'
import { useMutation } from 'urql'
import { INSERT_RECIPE_REVIEW_ONE } from 'queries'
import InputRow from 'components/InputRow'
import { useAuth } from 'context/AuthContext'
import { PlaceHolder } from 'components/Icon'

const CreateRecipeReview = ({ id }) => {
  const [state, setState] = useState({
    rating: '5',
    comment: '',
  })
  const { barista } = useAuth()
  const [, insertRecipeReview] = useMutation(INSERT_RECIPE_REVIEW_ONE)

  const onChangeGenerator = (attr) => (e) => {
    setState({
      ...state,
      [attr]: e.target.value,
    })
  }

  const submitReview = async (e) => {
    e.preventDefault()
    await insertRecipeReview({
      object: {
        barista_id: barista.id,
        recipe_id: id,
        rating: state.rating,
        comment: state.comment,
      },
    })
    setState({
      rating: '5',
      comment: '',
    })
  }

  return (
    <div className='bg-gray-50 px-4 py-6 sm:px-6'>
      <div className='flex space-x-3'>
        <div className='flex-shrink-0'>
          {barista?.avatar ? (
            <img
              className='h-10 w-10 rounded-full'
              src={barista?.avatar}
              alt=''
            />
          ) : (
            <PlaceHolder className='h-10 w-10' />
          )}
        </div>
        <div className='min-w-0 flex-1'>
          <form>
            <div>
              <label htmlFor='comment' className='sr-only'>
                About
              </label>
              <textarea
                id='comment'
                name='comment'
                rows='3'
                value={state.comment}
                onChange={onChangeGenerator('comment')}
                placeholder='Enter Review'
                className='shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md'
              />
            </div>
            <InputRow
              value={state.rating}
              onChange={onChangeGenerator('rating')}
              placeholder='Enter Rating'
              label='Rating'
            />

            <div className='mt-3 flex items-center justify-between'>
              <button
                onClick={submitReview}
                className='inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Add Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateRecipeReview
