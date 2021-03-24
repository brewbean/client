import { GET_ALL_BEANS } from 'queries'
import { useQuery } from 'urql'
import { useMemo } from 'react'
import qs from 'qs'
import { useLocation } from 'react-router-dom'
import List from 'components/Bean/List'
import { range } from 'helper/array'
import { Pagination } from 'components/Utility/List'

export default function Main() {
  const location = useLocation()
  const { page } = qs.parse(location.search, { ignoreQueryPrefix: true })

  const [{ data, fetching, error }] = useQuery({
    query: GET_ALL_BEANS,
    variables: {
      limit: 10,
      offset:
        page === undefined || page === '1' ? 0 : (parseInt(page) - 1) * 10,
    },
    context: useMemo(
      () => ({
        fetchOptions: {
          headers: {
            'x-hasura-role': 'all_barista',
          },
        },
      }),
      []
    ),
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  const totalPages = Math.ceil(data.bean_aggregate.aggregate.count / 10)
  const pageNumbers = totalPages > 1 ? range(1, totalPages) : []

  return (
    <div className='my-8 space-y-8 max-w-7xl mx-auto'>
      <div className='text-center'>
        <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
          Beans
        </h2>
        <div className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
          Explore coffee beans here!
        </div>
        {/* <button
          onClick={navigateToCreate}
          className='mt-4 btn btn--primary btn--lg'
        >
          Create Recipe
        </button> */}
      </div>

      <List beans={data.bean} />

      {pageNumbers.length > 1 && <Pagination pageNumbers={pageNumbers} />}
    </div>
  )
}
