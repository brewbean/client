import { useEffect } from 'react'
import { useAlert, alertType } from 'context/AlertContext'
import { useParams, useLocation } from 'react-router'
import { useQuery, useMutation } from 'urql'
import { GET_SINGLE_BREW_LOG, DELETE_BREW_LOG } from 'queries'
import { Error } from 'components/Icon/Alert'
import { Loading } from 'components/Utility'
import { Description } from 'components/BrewLog/Detail'

export default function Detail() {
  let { id } = useParams()
  const location = useLocation()
  const { addAlert } = useAlert()

  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_BREW_LOG,
    variables: { id: id ? parseInt(id) : null },
  })
  const [, deleteRecipe] = useMutation(DELETE_BREW_LOG)
  const onDelete = async (id) => await deleteRecipe({ id })

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
  return fetching || !data ? (
    <div className='flex flex-col items-center col-span-2'>
      <Loading />
    </div>
  ) : error ? (
    <div className='text-red-600 flex flex-col items-center col-span-2'>
      <Error className='h-6 w-6' />
      <h1 className='mt-2 text-sm font-medium'>Error fetching brew log</h1>
    </div>
  ) : (
    <Description {...data?.brew_log_by_pk} onDelete={onDelete} />
  )
}
