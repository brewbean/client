import { useQuery } from 'urql'
import { useMemo } from 'react'
import { GET_ALL_RECIPES } from 'queries'
import { Header, Title } from 'components/BrewLog/Form'
import { TEMPLATE_FORM, RECIPE_IMPORT } from './index'

const Search = ({ goBack, goTo }) => {
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

  const goToImport = (recipe) => () => goTo(RECIPE_IMPORT, recipe)
  const goToTemplate = (recipe) => () => goTo(TEMPLATE_FORM, recipe)

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>
  return (
    <div>
      <Header goBack={goBack} />

      <Title
        extraClasses='mt-2'
        title='Create a brew log'
        subtitle='Step 2: Select a recipe to import or use as a template!'
      />

      <ul className='mt-4'>
        {data.recipe.map((r) => (
          <li
            key={r.id}
            tabIndex='0'
            className='p-4 flex justify-between items-center rounded-lg hover:bg-gray-200 focus:outline-none'
          >
            <div className='whitespace-nowrap'>
              <h3 className='text-sm font-medium text-gray-900'>{r.name}</h3>
              <h4 className='text-gray-500 text-xs font-normal'>
                {r.barista.display_name}
              </h4>
            </div>
            <div className='space-x-2'>
              <button
                onClick={goToImport(r)}
                className='btn btn--white btn--sm'
              >
                Import
              </button>
              <button
                onClick={goToTemplate(r)}
                className='btn btn--white btn--sm'
              >
                Template
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Search
