import { useRouteMatch, Link } from 'react-router-dom'
import { DELETE_RECIPE_REVIEW } from 'queries'
import { useMutation } from 'urql'
import { useAuth } from 'context/AuthContext'

const RecipeReview = ({ recipe_reviews }) => {
  const { url } = useRouteMatch()
  const [, deleteReview] = useMutation(DELETE_RECIPE_REVIEW)
  const deleteReviewPressed = async (id) => {
    await deleteReview({ id })
  }
  const { barista: userBarista } = useAuth()

  return (
    <div>
      <ul className='space-y-8'>
        {recipe_reviews.map((n, i) => (
          <div key={i}>
            <li>
              <div className='flex space-x-3'>
                <div className='flex-shrink-0'>
                  <img
                    className='h-10 w-10 rounded-full'
                    src={n.barista?.avatar}
                    alt=''
                  />
                </div>
                <div>
                  <div className='text-sm'>
                    <div className='font-medium text-gray-900'>
                      {n.barista?.display_name}
                    </div>
                  </div>
                  <div className='mt-1 text-sm text-gray-700'>
                    <p>{n.comment}</p>
                  </div>
                  <div className='mt-2 text-sm space-x-2'>
                    <span className='text-gray-500 font-medium'>
                      Rating: {n.rating}/5
                    </span>
                    <span className='text-gray-500 font-medium'>&middot;</span>
                    <span className='text-gray-500 font-medium'>
                      {n.date_added.substring(0, 10)}
                    </span>
                    {userBarista?.id === n.barista?.id ? (
                      <div>
                        <span className='text-gray-500 font-medium'>
                          &middot;
                        </span>
                        <Link
                          to={`${url}/review/${n.id}/edit`}
                          type='button'
                          className='text-gray-900 font-medium'
                        >
                          Edit
                        </Link>
                        <span className='text-gray-500 font-medium'>
                          &middot;
                        </span>
                        <button
                          onClick={() => deleteReviewPressed(n.id)}
                          type='button'
                          className='text-gray-900 font-medium'
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default RecipeReview
