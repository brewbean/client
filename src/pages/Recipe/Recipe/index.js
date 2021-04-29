import { useMemo, useEffect, useCallback, useState } from 'react'
import { useQuery } from 'urql'
import qs from 'qs'
import { GET_ALL_RECIPES } from 'queries/Recipe'
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import { useAlert, alertType } from 'context/AlertContext'
import { useAuth } from 'context/AuthContext'
import { useModal } from 'context/ModalContext'
import Table from './Table'
import { range } from 'helper/array'
import { Pagination } from 'components/Utility/List'
import { setUrqlHeader } from 'helper/header'
import { ErrorMessage, Loading } from 'components/Utility'
import { ASC, DESC } from 'constants/query'

const getPageNumbers = (count) => {
  const totalPages = Math.ceil(count / 10)
  return totalPages > 1 ? range(1, totalPages) : []
}

const Recipes = () => {
  const { isAuthenticated, isVerified } = useAuth()
  const {
    isSuccess,
    isPending,
    open,
    content,
    setContent,
    setModalAlert,
    reset,
  } = useModal()
  const { url } = useRouteMatch()
  const { addAlert, clearAlerts } = useAlert()
  const location = useLocation()
  const history = useHistory()
  const { page } = qs.parse(location.search, { ignoreQueryPrefix: true })
  const [searchText, setSearchText] = useState('')
  const [query, setQuery] = useState('%%')
  const [orderBy, setOrderBy] = useState([{ id: DESC }])
  const [filters, setFilters] = useState({})

  const [{ data, fetching, error }] = useQuery({
    query: GET_ALL_RECIPES,
    variables: {
      query,
      orderBy,
      limit: 10,
      offset:
        page === undefined || page === '1' ? 0 : (parseInt(page) - 1) * 10,
    },
    context: useMemo(
      () => setUrqlHeader({ 'x-hasura-role': 'all_barista' }),
      []
    ),
  })

  useEffect(() => {
    if (location.state?.createdRecipe) {
      addAlert({
        type: alertType.SUCCESS,
        header: 'Recipe successfully created!',
        close: true,
      })
      history.replace(location.path, {})
    }
  }, [location, history, addAlert])

  const triggerUnverifiedModal = useCallback(() => {
    open()
    setModalAlert(false)
    setContent('unverified')
  }, [open, setModalAlert, setContent])

  const navigateToCreate = () => {
    if (isVerified) {
      clearAlerts()
      history.push(`${url}/new`, { fromRecipe: true })
    } else if (isAuthenticated) {
      triggerUnverifiedModal()
    } else {
      open()
      setContent('login', 'You must be logged in to create a recipe')
    }
  }

  const executeSearch = (e) => {
    e.preventDefault()
    setQuery('%' + searchText.trim() + '%')
  }

  const onSearchChange = ({ target }) => {
    if (target.value === '') {
      setQuery('%%')
    }
    setSearchText(target.value)
  }

  const sortHandler = (property) => () => {
    let newFilters = { ...filters }
    if (property === 'recipe_reviews_aggregate') {
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

  useEffect(() => {
    if (!isPending && isSuccess && content === 'login' && isVerified) {
      // need to clear modal settings so that going back
      // to this page doesn't retrigger this effect
      reset()
      clearAlerts()
      history.push(`${url}/new`, { fromRecipe: true })
    }
  }, [
    isPending,
    isSuccess,
    content,
    isVerified,
    url,
    history,
    reset,
    clearAlerts,
  ])

  if (error) return <ErrorMessage message={error.message} />

  return (
    <div className='my-8 space-y-8'>
      <div className='text-center'>
        <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
          Recipes
        </h2>
        <div className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
          Explore coffee recipes here!
        </div>
        <button
          onClick={navigateToCreate}
          className='mt-4 btn btn--primary btn--lg'
        >
          Create Recipe
        </button>
      </div>
      <form
        onSubmit={executeSearch}
        className='sm:mx-auto sm:w-2/3 flex flex-wrap space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-nowrap'
      >
        <input
          type='text'
          className='input'
          value={searchText}
          onChange={onSearchChange}
        />
        <button
          type='submit'
          className='btn btn--md btn--primary w-full sm:w-auto'
        >
          {fetching ? (
            <Loading defaultPadding={false} className='h-5 w-5 text-white' />
          ) : (
            'Search'
          )}
        </button>
      </form>
      {!fetching && !error && (
        <>
          <Table
            recipes={data.recipe}
            sortHandler={sortHandler}
            filters={filters}
          />

          {getPageNumbers(data.recipe_aggregate.aggregate.count).length > 1 && (
            <Pagination
              pageNumbers={getPageNumbers(
                data.recipe_aggregate.aggregate.count
              )}
            />
          )}
        </>
      )}
    </div>
  )
}
export default Recipes
