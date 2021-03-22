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
  console.log('Search: ', data)
  return (
    <div>
      Recipe Here
      {data.recipe.map((r, i) => (
        <div key={i}>
          what
          <p>ID: {r.id}</p>
          <p>Name: {r.name}</p>
          <button
            onClick={() => navigateToCreate(r)}
            className='my-4 btn btn--primary btn--lg'
          >
            {' '}
            Import Recipe{' '}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Search
