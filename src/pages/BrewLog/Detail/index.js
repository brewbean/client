import { useEffect, useMemo } from 'react'
import { useParams, useHistory } from 'react-router'
import { useQuery, useMutation } from 'urql'
import { GET_BREW_LOG, DELETE_BREW_LOG } from 'queries/BrewLog'
import { Error } from 'components/Icon/Alert'
import { Loading } from 'components/Utility'
import { Description } from 'components/BrewLog/Detail'
import { useModal } from 'context/ModalContext'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

export default function Detail() {
  const history = useHistory()
  let { id } = useParams()

  const { isSuccess, isPending, open, content, setContent, reset } = useModal()

  const [, deleteBrewLog] = useMutation(DELETE_BREW_LOG)

  const onDelete = () => {
    open()
    setContent('delete')
  }

  useEffect(() => {
    const execDelete = async () => {
      await deleteBrewLog({ id })
      reset()
      history.push(`/brewlog`)
    }
    if (!isPending && isSuccess && content === 'delete') {
      execDelete()
    }
  }, [history, id, content, isPending, isSuccess, reset, deleteBrewLog])

  const [{ data, fetching, error }] = useQuery({
    query: GET_BREW_LOG,
    variables: { id: id ? parseInt(id) : null },
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

  return fetching ? (
    <div className='flex flex-col items-center col-span-2'>
      <Loading />
    </div>
  ) : !data ? (
    <div className='text-gray-700 flex flex-col items-center col-span-2'>
      <ExclamationCircleIcon className='w-6 h-6' />
      <h1 className='mt-2 text-sm font-medium'>No brew log here!</h1>
    </div>
  ) : error ? (
    <div className='text-red-600 flex flex-col items-center col-span-2'>
      <Error className='h-6 w-6' />
      <h1 className='mt-2 text-sm font-medium'>Error fetching brew log</h1>
    </div>
  ) : (
    <Description {...data.brew_log_by_pk} onDelete={onDelete} />
  )
}
