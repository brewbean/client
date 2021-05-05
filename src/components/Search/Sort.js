import { ASC, DESC } from 'constants/query'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'
import { combineClass } from 'helper/stringHelper'

export const Sort = ({ onClick, direction }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className={combineClass('focus:outline-none font-bold rounded-full p-1', {
        'bg-indigo-100 text-indigo-700': direction,
      })}
    >
      {direction === ASC ? (
        <ChevronUpIcon className='h-5 w-5' />
      ) : (
        <ChevronDownIcon className='h-5 w-5 ' />
      )}
    </button>
  )
}

export const sortHandler = (
  filters,
  property,
  setFilters,
  setOrderBy
) => () => {
  let newFilters = { ...filters }
  if (property === 'barista') {
    newFilters.barista = !filters.barista
      ? { display_name: DESC }
      : filters.barista.display_name === DESC
      ? { display_name: ASC }
      : null
  } else if (property === 'recipe_reviews_aggregate') {
    newFilters.recipe_reviews_aggregate = !filters.recipe_reviews_aggregate
      ? { avg: { rating: DESC } }
      : filters.recipe_reviews_aggregate.avg.rating === DESC
      ? { avg: { rating: ASC } }
      : null
  } else {
    newFilters[property] = !filters[property]
      ? DESC
      : filters[property] === DESC
      ? ASC
      : null
  }
  const newOrderBy = Object.keys(newFilters)
    .reduce(
      (arr, key) => [
        ...arr,
        newFilters[key] ? { [key]: newFilters[key] } : null,
      ],
      []
    )
    .filter((recipeOrderBy) => recipeOrderBy !== null)

  setFilters(newFilters)
  setOrderBy(newOrderBy.length > 0 ? newOrderBy : [{ id: DESC }])
}
