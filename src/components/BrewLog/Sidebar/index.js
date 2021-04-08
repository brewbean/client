import { Rating } from 'components/Badge'
import { Error } from 'components/Icon/Alert'
import { Loading } from 'components/Utility'
import { combineClass } from 'helper/stringHelper'
import { Link, useRouteMatch, useLocation, matchPath } from 'react-router-dom'

const LinkButton = ({ id, title, date_created, rating }) => {
  const { url, path } = useRouteMatch()
  const { search, pathname } = useLocation()
  const match = matchPath(pathname, { path: path + '/:id' })

  return (
    <Link
      to={{ pathname: url + '/' + id, search }}
      className={combineClass(
        'p-4 bg-white hover:bg-gray-200 flex justify-between items-center',
        {
          'bg-gray-200 cursor-not-allowed': match?.params?.id === `${id}`,
        }
      )}
    >
      <div className='flex flex-col'>
        <h1 className='text-sm font-medium text-gray-900'>{title}</h1>
        <time
          className='text-gray-500 text-xs font-normal'
          dateTime={date_created}
        >
          {date_created.substring(0, 10)}
        </time>
      </div>

      <Rating value={rating} />
    </Link>
  )
}

const Sidebar = ({ loading, error, logs }) =>
  loading || !logs ? (
    <Loading defaultPadding={false} containerClass='p-4 bg-gray-50' />
  ) : error ? (
    <div className='p-4 bg-gray-50 text-red-600 flex flex-col items-center'>
      <Error className='h-6 w-6' />
      <h1 className='mt-2 text-sm font-medium'>Error fetching brew logs</h1>
    </div>
  ) : (
    <ul className='divide-y divide-gray-200'>
      {logs.length === 0 && (
        <div className='p-4 text-gray-700 flex flex-col items-center'>
          <h1 className='text-sm font-medium'>
            Create your first entry! ☕ 📝
          </h1>
        </div>
      )}
      {logs.map((log) => (
        <li key={log.id}>
          <LinkButton {...log} />
        </li>
      ))}
    </ul>
  )

export default Sidebar
