import { useQuery } from 'urql'
import { useMemo } from 'react'
import { GET_ALL_RECIPES } from 'queries'

const Search = ({ navigateToCreate }) => {
  const [{ data, fetching, error }] = useQuery({
    query: GET_ALL_RECIPES,
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
  return (
    <div className='sm:col-span-2'>
      <div className='text-center'>
        <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
          Import
        </h2>
        <div className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
          Select a recipe to import or to use as a template!
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='table-auto w-full divide-y divide-gray-200'>
          <thead>
            <tr>
              <th
                scope='col'
                className='px-6 py-3 text-left text-sm font-medium text-gray-600'
              >
                Name
              </th>
              <th
                scope='col'
                className='px-6 py-3 text-left text-sm font-medium text-gray-600'
              >
                Import
              </th>
              {/* <th
                scope='col'
                className='px-6 py-3 text-left text-sm font-medium text-gray-600'
              >
                Template
              </th> */}
            </tr>
          </thead>
          <tbody>
            {data.recipe.map((r) => (
              <tr
                key={r.id}
                tabIndex='0'
                onClick={() => navigateToCreate(r, true)}
                className='rounded-lg cursor-pointer hover:bg-gray-200 focus:bg-gray-300 focus:outline-none focus:shadow-inner'
              >
                <td className='rounded-l-lg px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  <div>{r.name}</div>
                  <div className='text-gray-500 text-xs font-normal'>
                    {r.barista.display_name}
                  </div>
                </td>
                <td className='rounded-l-lg px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  <button
                    onClick={() => navigateToCreate(r, true)}
                    className='my-4 btn btn--primary btn--lg'
                  >
                    Import
                  </button>
                </td>
                <td className='rounded-l-lg px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {/* <button
                    // onClick={() => navigateToCreate(r, true)}
                    className='my-4 btn btn--white btn--lg'
                  >
                    Template
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Search
