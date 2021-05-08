import { useMemo, useEffect, useCallback, useState } from 'react'
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import { useQuery } from 'urql'
import qs from 'qs'
import { useAlert, alertType } from 'context/AlertContext'
import { useAuth } from 'context/AuthContext'
import { useModal } from 'context/ModalContext'
import { GET_ALL_BEANS } from 'queries/Bean'
import List from 'components/Bean/List'
import { range } from 'helper/array'
import { Pagination } from 'components/Utility/List'
import { setUrqlHeader } from 'helper/header'
import { Loading } from 'components/Utility'
import { DESC } from 'constants/query'

const getPageNumbers = (count) => {
  const totalPages = Math.ceil(count / 10)
  return totalPages > 1 ? range(1, totalPages) : []
}

export default function Main() {
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
    query: GET_ALL_BEANS,
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
    if (location.state?.createdBean) {
      addAlert({
        type: alertType.SUCCESS,
        header: 'Bean successfully created!',
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
      history.push(`${url}/new`, { fromBean: true })
    } else if (isAuthenticated) {
      triggerUnverifiedModal()
    } else {
      open()
      setContent('login', 'You must be logged in to add a bean entry')
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

  useEffect(() => {
    if (!isPending && isSuccess && content === 'login' && isVerified) {
      // need to clear modal settings so that going back
      // to this page doesn't retrigger this effect
      reset()
      clearAlerts()
      history.push(`${url}/new`, { fromBean: true })
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

  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className='my-8 space-y-8'>
      <div className='text-center'>
        <h2 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
          Beans
        </h2>
        <div className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4'>
          Explore coffee beans here!
        </div>
        <button
          onClick={navigateToCreate}
          className='mt-4 btn btn--primary btn--lg'
        >
          Add Bean
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
          <List
            beans={data.bean}
            filters={filters}
            setFilters={setFilters}
            setOrderBy={setOrderBy}
          />

          {getPageNumbers(data.bean_aggregate.aggregate.count).length > 1 && (
            <Pagination
              pageNumbers={getPageNumbers(data.bean_aggregate.aggregate.count)}
            />
          )}
        </>
      )}
    </div>
  )
}
