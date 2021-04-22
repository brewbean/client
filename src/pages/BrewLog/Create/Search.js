import { useQuery } from 'urql'
import { useMemo, useState } from 'react'
import { GET_ALL_RECIPES } from 'queries/Recipe'
import { Header, Title } from 'components/BrewLog/Form'
import { TEMPLATE_FORM, RECIPE_IMPORT } from './index'
import { setUrqlHeader } from 'helper/header'
import { ErrorMessage, Loading } from 'components/Utility'
import { combineClass } from 'helper/stringHelper'

const RecipeRow = ({ onImport, onTemplate, recipeName, displayName }) => (
  <li
    tabIndex='0'
    className='p-4 flex justify-between items-center rounded-lg hover:bg-gray-200 focus:outline-none'
  >
    <div className='whitespace-nowrap overflow-hidden'>
      <h3 className='text-sm font-medium text-gray-900 truncate'>
        {recipeName}
      </h3>
      <h4 className='text-gray-500 text-xs font-normal'>{displayName}</h4>
    </div>
    <div className='space-x-2 whitespace-nowrap'>
      <button onClick={onImport} className='btn btn--white btn--sm'>
        Import
      </button>
      <button onClick={onTemplate} className='btn btn--white btn--sm'>
        Template
      </button>
    </div>
  </li>
)

const PaginationRow = ({
  start,
  end,
  total,
  isFirstPage,
  onPrevious,
  onNext,
}) => (
  <div className='px-4 mt-2 pt-4 border-t-2 border-gray-200 flex justify-between items-center'>
    <div>
      <p className='text-sm text-gray-700'>
        <span className='font-medium'>
          {start} - {end}
        </span>{' '}
        of <span className='font-medium'>{total} recipes</span>
      </p>
    </div>
    <div className='space-x-2'>
      <button
        type='button'
        className={combineClass('btn btn--sm btn--white', {
          'opacity-50 pointer-events-none': isFirstPage,
        })}
        onClick={onPrevious}
      >
        Previous
      </button>

      <button
        type='button'
        className={combineClass('btn btn--sm btn--white', {
          'opacity-50 pointer-events-none': end === total,
        })}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  </div>
)

export default function Search({ goBack, goTo }) {
  const [page, setPage] = useState(0)
  const offset = page * 10

  const [{ data, fetching, error }] = useQuery({
    query: GET_ALL_RECIPES,
    variables: {
      limit: 10,
      offset,
    },
    context: useMemo(
      () => setUrqlHeader({ 'x-hasura-role': 'all_barista' }),
      []
    ),
  })

  const goToImport = (recipe) => () => goTo(RECIPE_IMPORT, recipe)
  const goToTemplate = (recipe) => () => goTo(TEMPLATE_FORM, recipe)

  const goToPreviousPage = () => setPage(page - 1)
  const goToNextPage = () => setPage(page + 1)

  if (fetching) return <Loading />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <>
      <Header goBack={goBack} />

      <Title
        extraClasses='mt-2'
        title='Create a brew log'
        subtitle='Select a recipe to import or use as a template'
      />

      <ul className='mt-4'>
        {data.recipe.map((r) => (
          <RecipeRow
            key={r.id}
            recipeName={r.name}
            displayName={r.barista ? r.barista.display_name : '[ DELETED ]'}
            onImport={goToImport(r)}
            onTemplate={goToTemplate(r)}
          />
        ))}
      </ul>

      <PaginationRow
        isFirstPage={page === 0}
        start={1 + offset}
        end={data.recipe.length + offset}
        total={data.recipe_aggregate.aggregate.count}
        onPrevious={goToPreviousPage}
        onNext={goToNextPage}
      />
    </>
  )
}
