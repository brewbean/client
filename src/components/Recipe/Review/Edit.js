import { useState } from 'react'
import { useMutation } from 'urql'
import { UPDATE_RECIPE_REVIEW } from 'queries'
import InputRow from 'components/InputRow'
import { PlaceHolder } from 'components/Icon'

const Edit = ({ review, close }) => {
  const [state, setState] = useState({
    rating: review.rating,
    comment: review.comment,
  })
  
  const [, updateReview] = useMutation(UPDATE_RECIPE_REVIEW)
  const onChangeGenerator = (attr) => (e) => {
    setState({
      ...state,
      [attr]: e.target.value,
    })
  }

  const submitReview = async () => {
    await updateReview({
      id: review.id,
      object: {
        barista_id: review.barista.id,
        recipe_id: review.recipe_id,
        ...state,
      },
    })
    close()
  }

  return (
    <div className='bg-gray-50 px-4 py-6 sm:px-6'>
      <div className='flex space-x-3'>
        <div className='flex-shrink-0'>
          {review.barista?.avatar ? (
            <img
              className='h-10 w-10 rounded-full'
              src={review.barista?.avatar}
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

            <div className='mt-5 sm:mt-4 flex justify-end'>
              <button
                type='button'
                onClick={submitReview}
                className='mr-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Submit
              </button>
              <button
                type='button'
                onClick={close}
                className='inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit
