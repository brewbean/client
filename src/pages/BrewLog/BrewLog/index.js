import { useEffect, useMemo } from 'react'
import { Link, useLocation, useRouteMatch } from 'react-router-dom'
import { useAlert, alertType } from 'context/AlertContext'
import { useQuery, useMutation } from 'urql'
import { DELETE_BREW_LOG, GET_ALL_BREW_LOGS } from 'queries'
const Brewlogs = () => {
  const { url } = useRouteMatch()

  const location = useLocation()
  const { addAlert } = useAlert()
  const [{ data, fetching, error }] = useQuery({
    query: GET_ALL_BREW_LOGS,
    context: useMemo(
      () => ({
        fetchOptions: {
          headers: {
            'x-hasura-role': 'barista',
          },
        },
      }),
      []
    ),
  })
  const [, deleteRecipe] = useMutation(DELETE_BREW_LOG)
  const onDelete = async (id) => {
    await deleteRecipe({ id })
  }
  useEffect(() => {
    if (location.state?.createdBrewLog) {
      addAlert({
        type: alertType.SUCCESS,
        header: 'Brew log successfully created!',
        close: true,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div>
      {data.brew_log.map((r, i) => (
        <div key={i}>
          what
          <p>ID: {r.id}</p>
          <p>Name: {r.title}</p>
          <Link
            to={`${url}/${r.id}/edit`}
            // onClick={() => navigateToCreate(r)}
            className='my-4 btn btn--primary btn--lg'
          >
            {' '}
            Edit Brew Log{' '}
          </Link>
          <button
            className='my-4 btn btn--primary btn--lg'
            onClick={() => onDelete(r.id)}
          >
            Delete Brew Log
          </button>
        </div>
      ))}
    </div>
  )
}

export default Brewlogs
