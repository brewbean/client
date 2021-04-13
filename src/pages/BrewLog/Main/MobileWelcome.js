import { useRouteMatch, Link } from 'react-router-dom'
import { Title } from 'components/BrewLog/Form'
import { Plus } from 'components/Icon'
import Sidebar from 'components/BrewLog/Sidebar'
import { BasicPagination } from 'components/Utility/List'
import { useQueryParams } from 'components/Utility/Hook'

export default function MobileWelcome({ fetching, error, data, goToCreate }) {
  const { url } = useRouteMatch()
  const { page } = useQueryParams()
  const currPage = page ? parseInt(page) : 1
  const offset = (currPage - 1) * 10

  return (
    <>
      <Title
        extraClasses='border-none'
        title='Select a brew log to view details ☕ 📝'
      />
      <div className='rounded-lg bg-gray-50'>
        <div className='py-4 px-6 flex items-center justify-between border-b border-gray-200'>
          <Link
            to={url}
            className='text-lg leading-6 font-medium text-gray-900'
          >
            Brew logs
          </Link>

          <button
            type='button'
            onClick={goToCreate}
            to={`${url}/new`}
            className='btn btn--white btn--xs'
          >
            <Plus className='w-5 h-5' />
          </button>
        </div>

        <Sidebar loading={fetching} error={error} logs={data?.brew_log} />

        <div className='py-4 px-6'>
          <BasicPagination
            start={1 + offset}
            end={data?.brew_log.length + offset}
            total={data?.brew_log_aggregate?.aggregate?.count}
          />
        </div>
      </div>
    </>
  )
}
