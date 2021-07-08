import { Link, useRouteMatch } from 'react-router-dom'
import { Modal } from 'components/Modal'
import Sidebar from 'components/BrewLog/Sidebar'
import { Plus } from 'components/Icon'
import { Header } from 'components/Layout'
import Footer from 'components/Layout/Footer'
import { useQueryParams } from 'components/Utility/Hook'
import { BasicPagination } from 'components/Utility/List'
import Routes from './Routes'

export default function Main({ fetching, error, data, goToCreate }) {
  const { url } = useRouteMatch()
  const { page } = useQueryParams()
  const currPage = page ? parseInt(page) : 1
  const offset = (currPage - 1) * 10
  const start = data?.brew_log.length !== 0 ? 1 : 0

  return (
    <div className='bg-gray-100'>
      <div className='max-w-5xl mx-auto h-screen overflow-hidden flex flex-col px-4 sm:px-6 lg:px-8'>
        <Header />

        {/* Content area */}
        <div className='min-h-0 flex-1 flex overflow-hidden'>
          <main className='min-w-0 flex-1 flex space-x-4'>
            {/* brew log list*/}
            <aside className='flex flex-shrink-0'>
              <div className='flex flex-col w-80 bg-gray-50 rounded-lg'>
                <div className='flex-shrink-0 h-16 px-6 flex justify-between items-center border-b border-gray-200'>
                  <Link
                    to={url}
                    className='text-lg leading-6 font-medium text-gray-900'
                  >
                    Brew logs
                  </Link>
                  <div>
                    <button
                      type='button'
                      onClick={goToCreate}
                      to={`${url}/new`}
                      className='btn btn--white btn--xs'
                    >
                      <Plus className='w-5 h-5' />
                    </button>
                  </div>
                </div>

                <nav className='min-h-0 flex-1 overflow-y-auto bg-white'>
                  <Sidebar
                    loading={fetching}
                    error={error}
                    logs={data?.brew_log}
                  />
                </nav>

                {/* Pagination controls */}
                <div className='flex-shrink-0 h-16 px-6 flex flex-col justify-center border-t border-gray-200'>
                  <BasicPagination
                    start={start + offset}
                    end={data?.brew_log.length + offset}
                    total={data?.brew_log_aggregate?.aggregate?.count}
                  />
                </div>
              </div>
            </aside>

            {/* Detail area */}
            <section className='min-w-0 flex-1 flex flex-col overflow-hidden bg-white rounded-lg'>
              <div className='min-h-0 flex-1 overflow-y-auto'>
                {/* Content */}
                <div className='px-4 py-5 sm:px-6'>
                  <Routes fetching={fetching} />
                </div>
              </div>
            </section>
          </main>
        </div>

        <Footer />
      </div>
      <Modal />
    </div>
  )
}
