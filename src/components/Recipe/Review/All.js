import { useEffect, useState } from 'react'
import { DELETE_RECIPE_REVIEW } from 'queries/Recipe'
import { useMutation } from 'urql'
import { useAuth } from 'context/AuthContext'
import { PlaceHolder } from 'components/Icon'
import { useModal } from 'context/ModalContext'

const All = ({ recipe_reviews, onEdit, isEditing }) => {
  const { barista: userBarista } = useAuth()
  const { isSuccess, isPending, open, content, setContent, reset } = useModal()

  const [id, setId] = useState(null)

  const [, deleteReview] = useMutation(DELETE_RECIPE_REVIEW)

  const deleteReviewPressed = (id) => {
    setId(id)
    open()
    setContent('deleteReview')
  }

  useEffect(() => {
    const execDelete = async () => {
      await deleteReview({ id })
      reset()
    }
    if (!isPending && isSuccess && content === 'deleteReview') {
      execDelete()
    }
  }, [id, content, isPending, isSuccess, reset, deleteReview])

  return (
    <div>
      <ul className='space-y-8'>
        {recipe_reviews.map((review, i) => (
          <div key={i}>
            <li>
              <div className='flex space-x-3'>
                {review.barista?.avatar ? (
                  <img
                    className='h-10 w-10 rounded-full'
                    src={review.barista?.avatar}
                    alt=''
                  />
                ) : (
                  <PlaceHolder className='h-10 w-10' />
                )}
                <div>
                  <div className='text-sm'>
                    <div className='font-medium text-gray-900'>
                      {review.barista?.display_name}
                    </div>
                  </div>
                  <div className='mt-1 text-sm text-gray-700'>
                    <p>{review.comment}</p>
                  </div>
                  <div className='mt-2 text-sm space-x-2'>
                    <span className='text-gray-500 font-medium'>
                      Rating: {review.rating}/5
                    </span>
                    <span className='text-gray-500 font-medium'>&middot;</span>
                    <span className='text-gray-500 font-medium'>
                      {review.date_added.substring(0, 10)}
                    </span>
                  </div>
                  {userBarista?.id === review.barista?.id && !isEditing && (
                    <div className='mt-2 space-x-2'>
                      <button
                        onClick={onEdit(review)}
                        type='button'
                        className='text-sm font-medium text-gray-700 hover:text-indigo-500 focus:outline-none'
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteReviewPressed(review.id)}
                        type='button'
                        className='text-sm font-medium text-gray-500 hover:text-gray-600 focus:outline-none'
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default All
