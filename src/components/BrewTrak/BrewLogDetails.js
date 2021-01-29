import { useRouteMatch, Link } from 'react-router-dom'
import { useQuery, useMutation } from 'urql'
import { GET_SINGLE_BREW_LOG, DELETE_BREW_LOGS } from 'queries'
import SelectBrew from './SelectBrew'
import CoffeeNotSelected from './Icons/no-coffee-selected.jpg'

const BrewLogDetails = ({ brewLogId, brewSelected, setBrewSelected }) => {
  const { url } = useRouteMatch()
  const [, deleteBrewLog] = useMutation(DELETE_BREW_LOGS)

  const deleteBrewLogPressed = async () => {
    await deleteBrewLog({ id: brewLogId })
    setBrewSelected(false)
  }

  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_BREW_LOG,
    variables: { id: brewLogId },
  })

  if (fetching) return <p>Loading...</p>
  if (error || !data.brew_logs_by_pk) return <SelectBrew />
  const {
    id,
    bean,
    brew_type,
    bean_weight,
    bean_grind,
    water_amount,
    water_temp,
    rating,
    comment,
    date_added,
  } = data.brew_logs_by_pk

  return (
    <>
      {!brewSelected ? (
        <SelectBrew />
      ) : (
        <div className='h-screen flex overflow-hidden bg-white'>
          <div className='flex flex-col min-w-0 flex-1 overflow-hidden'>
            <div className='flex-1 relative z-0 flex overflow-hidden'>
              <main
                className='flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last'
                tabindex='0'
              >
                <article>
                  <div>
                    <div>
                      <img
                        className='h-32 w-full object-cover lg:h-48'
                        src={
                          'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80'
                        }
                        alt=''
                      />
                    </div>
                    <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                      <div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
                        <div className='flex'>
                          <img
                            className='h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32'
                            src={bean ? bean?.img : CoffeeNotSelected}
                            alt='Coffee Bean'
                          />
                        </div>
                        <div className='mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
                          <div className='sm:hidden 2xl:block mt-6 min-w-0 flex-1'>
                            <h1 className='text-2xl font-bold text-gray-900 truncate'>
                              {bean?.name}
                            </h1>
                          </div>
                          <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                            <Link
                              to={`${url}/${id}/edit`}
                              className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                            >
                              {/* <!-- Heroicon name: mail --> */}
                              <svg
                                className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                aria-hidden='true'
                              >
                                <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                                <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                              </svg>
                              <span>Edit Recipe</span>
                            </Link>
                            <button
                              type='button'
                              onClick={deleteBrewLogPressed}
                              className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                            >
                              <svg
                                className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 20 20'
                                fill='currentColor'
                                aria-hidden='true'
                              >
                                <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                              </svg>
                              <span>Delete Recipe</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1'>
                        <h1 className='text-2xl font-bold text-gray-900 truncate'>
                          {bean?.name}
                        </h1>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Tabs --> */}
                  <div className='mt-6 sm:mt-2 2xl:mt-5'>
                    <div className='border-b border-gray-200'>
                      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <nav
                          className='-mb-px flex space-x-8'
                          aria-label='Tabs'
                        >
                          {/* <!-- Current: "border-pink-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" --> */}
                          <div
                            className='border-pink-500 text-gray-900 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                            aria-current='page'
                          >
                            Profile
                          </div>
                          {/* <div className='border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'>
                            Calendar
                          </div> */}
                        </nav>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Description list --> */}
                  <div className='mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Brew Type
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {brew_type}
                        </dd>
                      </div>

                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Bean Weight
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {bean_weight}g
                        </dd>
                      </div>

                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Bean Grind
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {bean_grind}
                        </dd>
                      </div>

                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Water Amount
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {water_amount}
                        </dd>
                      </div>

                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Water Temperature
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {water_temp}
                        </dd>
                      </div>

                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Rating
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {rating}/5
                        </dd>
                      </div>
                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Date Added
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {date_added}
                        </dd>
                      </div>

                      <div className='sm:col-span-2'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Comments
                        </dt>
                        <dd className='mt-1 max-w-prose text-sm text-gray-900'>
                          <p>{comment}</p>
                          <p className='mt-5'></p>
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* <!-- Team member list --> */}
                  <div className='mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8'>
                    <h2 className='text-sm font-medium text-gray-500'>
                      Related Recipes
                    </h2>
                    <div className='mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2'>
                      <div className='relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500'>
                        <div className='flex-shrink-0'>
                          <img
                            className='h-10 w-10 rounded-full'
                            src={CoffeeNotSelected}
                            alt=''
                          />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='focus:outline-none'>
                            <span
                              className='absolute inset-0'
                              aria-hidden='true'
                            ></span>
                            <p className='text-sm font-medium text-gray-900'>
                              Sample Recipe
                            </p>
                            <p className='text-sm text-gray-500 truncate'>
                              Sample Description
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BrewLogDetails
