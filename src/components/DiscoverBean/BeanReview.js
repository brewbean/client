import { useQuery, useMutation } from 'urql'
import { GET_ALL_REVIEW_OF_BEAN, DELETE_BEAN_REVIEW } from 'queries'
import { useHistory } from 'react-router-dom'

const BeanReview = (props) => {
  let { bean_id } = props
  const history = useHistory()

  const [result] = useQuery({
    query: GET_ALL_REVIEW_OF_BEAN,
    variables: { _eq: bean_id },
  })
  const [, deleteReview] = useMutation(DELETE_BEAN_REVIEW)

  const deleteReviewPressed = async (id) => {
    await deleteReview({ id })
  }
  const { data, fetching, error } = result

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>
  const { nodes } = data.bean_reviews_aggregate
  return (
    <div>
      <div className='font-bold'>Bean Reviews</div>
      <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {nodes.length && nodes
          ? nodes.map((n, i) => (
              <div key={i}>
                <li className='col-span-1 bg-white rounded-lg shadow'>
                  <div className='w-full flex items-center justify-between p-6 space-x-6'>
                    <div className='flex-1 truncate'>
                      <div className='flex items-center space-x-3'>
                        <h3 className='text-gray-900 text-sm leading-5 font-medium truncate'>
                          {n.barista && n.barista.display_name}
                        </h3>
                        <span className='flex-shrink-0 inline-block px-2 py-0.5 text-teal-800 text-xs leading-4 font-medium bg-teal-100 rounded-full'>
                          Rating: {n.rating}
                        </span>
                      </div>
                      <p className='mt-1 text-gray-500 text-sm leading-5 truncate'>
                        {n.comment}
                      </p>
                      <p className='mt-1 text-gray-500 text-sm leading-5 truncate'>
                        {n.id}
                      </p>
                    </div>
                    <img
                      className='w-10 h-10 bg-gray-300 rounded-full flex-shrink-0'
                      src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60'
                      alt=''
                    />
                  </div>
                  <div className='border-t border-gray-200'>
                    <div className='-mt-px flex'>
                      <div className='w-0 flex-1 flex border-r border-gray-200'>
                        <button
                          onClick={() => deleteReviewPressed(n.id)}
                          className='relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150'
                        >
                          <svg
                            className='w-5 h-5 text-gray-400'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                            <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                          </svg>
                          <span className='ml-3'>Delete</span>
                        </button>
                      </div>
                      <div className='-ml-px w-0 flex-1 flex'>
                        <button
                          onClick={() =>
                            history.replace(
                              `/discover/bean/review/${n.id}/edit`
                            )
                          }
                          className='relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm leading-5 text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150'
                        >
                          <svg
                            className='w-5 h-5 text-gray-400'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                          </svg>
                          <span className='ml-3'>Edit</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            ))
          : 'No bean reviews available.'}
      </ul>
    </div>
  )
}

export default BeanReview
