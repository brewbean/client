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
          <div className='space-y-3'>
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
                className='input'
              />
            </div>
            <InputRow
              value={state.rating}
              onChange={onChangeGenerator('rating')}
              placeholder='Enter Rating'
              label='Rating'
            />

            <div className='flex justify-end'>
              <button
                type='button'
                onClick={submitReview}
                className='mr-2 btn btn--primary btn--md'
              >
                Submit
              </button>
              <button
                type='button'
                onClick={close}
                className='btn btn--white btn--md'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
