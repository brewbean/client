import { useParams } from 'react-router'
import { useQuery } from 'urql'
import { GET_SINGLE_BREW_LOG } from 'queries'
import { Error } from 'components/Icon/Alert'
import { Loading } from 'components/Utility'
import { Description } from 'components/BrewLog/Detail'

export default function Detail() {
  let { id } = useParams()

  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_BREW_LOG,
    variables: { id: id ? parseInt(id) : null },
  })

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
    <Description {...data?.brew_log_by_pk} />
  )
}
