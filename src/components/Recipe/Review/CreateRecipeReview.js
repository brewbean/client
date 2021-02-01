import { useState } from 'react'
import { useMutation } from 'urql'
import { INSERT_RECIPE_REVIEW_ONE } from 'queries'
import InputRow from 'components/InputRow'
import { useAuth } from 'context/AuthContext'

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
          <img
            className='h-10 w-10 rounded-full'
            src='https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
            alt=''
          />
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
              {/* <div className='group inline-flex items-start text-sm space-x-2 text-gray-500 hover:text-gray-900'>
                <svg
                  className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>Some HTML is okay.</span>
              </div> */}
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
// <div>
//   <div className='font-bold'>Create Review</div>
//   <InputRow
//     value={barista.display_name}
//     readOnly={true}
//     placeholder='Enter Barista'
//     label='Barista'
//   />
//   <InputRow
//     value={name}
//     readOnly={true}
//     placeholder='Enter Recipe'
//     label='Recipe'
//   />
//   <InputRow
//     value={state.rating}
//     onChange={onChangeGenerator('rating')}
//     placeholder='Enter Rating'
//     label='Rating'
//   />
//   <InputRow
//     value={state.comment}
//     onChange={onChangeGenerator('comment')}
//     placeholder='Enter Comment'
//     label='Comment'
//   />
//   <button
//     type='button'
//     onClick={submitReview}
//     className='mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
//   >
//     submit review
//   </button>
// </div>
