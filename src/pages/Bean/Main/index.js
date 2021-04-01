import { useMemo, useEffect, useCallback } from 'react'
import { useRouteMatch, useLocation, useHistory } from 'react-router-dom'
import { useQuery } from 'urql'
import qs from 'qs'
import { useAlert, alertType } from 'context/AlertContext'
import { useAuth } from 'context/AuthContext'
import { useModal } from 'context/ModalContext'
import { GET_ALL_BEANS } from 'queries'
import List from 'components/Bean/List'
import { range } from 'helper/array'
import { Pagination } from 'components/Utility/List'

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
  const { addAlert } = useAlert()
  const location = useLocation()
  const history = useHistory()
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

  useEffect(() => {
    if (location.state?.createdBean) {
      addAlert({
        type: alertType.SUCCESS,
        header: 'Bean successfully created!',
        close: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const triggerUnverifiedModal = useCallback(() => {
    open()
    setModalAlert(false)
    setContent('unverified')
  }, [open, setModalAlert, setContent])

  const navigateToCreate = () => {
    if (isVerified) {
      history.push(`${url}/new`, { fromBean: true })
    } else if (isAuthenticated) {
      triggerUnverifiedModal()
    } else {
      open()
      setContent('login', 'You must be logged in to add a bean entry')
    }
  }

  useEffect(() => {
    if (!isPending && isSuccess && content === 'login' && isVerified) {
      // need to clear modal settings so that going back
      // to this page doesn't retrigger this effect
      reset()
      history.push(`${url}/new`, { fromRecipe: true })
    }
  }, [isPending, isSuccess, content, isVerified, url, history, reset])

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  const totalPages = Math.ceil(data.bean_aggregate.aggregate.count / 10)
  const pageNumbers = totalPages > 1 ? range(1, totalPages) : []

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

      <List beans={data.bean} />

      {pageNumbers.length > 1 && <Pagination pageNumbers={pageNumbers} />}
    </div>
  )
}
