import { useMemo } from 'react'
import { useQuery } from 'urql'
import RecipeCard from './RecipeCard'
import { GET_ALL_RECIPES } from 'queries'
import { Link, useRouteMatch } from 'react-router-dom'

const Recipes = () => {
  const { url } = useRouteMatch()
  const [{ data, fetching, error }] = useQuery({
    query: GET_ALL_RECIPES,
    context: useMemo(
      () => ({
        fetchOptions: {
          headers: {
            'x-hasura-role': 'guest',
          },
        },
      }),
      []
    ),
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div>
      <div className='bg-gray-800 pb-32'>
        <header className='py-10'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl leading-9 font-bold text-white'>Recipes</h1>
          </div>
          <Link
            to={`${url}/new`}
            className='mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
          >
            new recipe
          </Link>
        </header>
      </div>
      <main className='-mt-32'>
        <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
          {/* <!-- Replace with your content --> */}
          <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {data && data.recipes.map((x, i) => <RecipeCard key={i} {...x} />)}
          </ul>
          {/* <!-- /End replace --> */}
        </div>
      </main>
    </div>
  )
}
export default Recipes
