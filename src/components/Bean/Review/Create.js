import { useState } from 'react'
import { useMutation } from 'urql'
import { INSERT_BEAN_REVIEW_ONE } from 'queries'
import InputRow from 'components/InputRow'
import { useAuth } from 'context/AuthContext'
import { PlaceHolder } from 'components/Icon'

const Create = ({ id }) => {
  const [state, setState] = useState({
    rating: '5',
    comment: '',
  })
  const { barista } = useAuth()
  const [, insertBeanReview] = useMutation(INSERT_BEAN_REVIEW_ONE)
  const onChangeGenerator = (attr) => (e) => {
    setState({
      ...state,
      [attr]: e.target.value,
    })
  }

  const submitReview = async () => {
    await insertBeanReview({
      object: {
        bean_id: id,
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

            <button
              type='button'
              onClick={submitReview}
              className='btn btn--primary btn--md'
            >
              Add Review
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create
