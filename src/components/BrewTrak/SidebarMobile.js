import { useRouteMatch, Link } from 'react-router-dom'
import BrewLog from './BrewLog'

const SidebarMobile = ({ data, setId, setBrewSelected }) => {
  const { url } = useRouteMatch()

  return (
    <div className='md:hidden'>
      <div className='fixed inset-0 flex z-10'>
        <div className='relative flex-1 flex flex-col '>
          <div className='absolute bottom-0 left-0 p-1 w-full bg-blue-100 rounded-t-lg border-t border-gray-250 flex-1 mb-3'>
            <div className='flex-1 pt-2 pb-4 overflow-y-auto'>
              <div className='px-2'>
                <div className='flex items-center mx-4 py-2 text-md leading-5 font-bold text-gray-900'>
                  LOGS
                </div>
                <Link
                  to={`${url}/new`}
                  className='mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
                >
                  add brew
                </Link>
                <div className='flex flex-row'>
                  {data.brew_logs.length === 0 ? (
                    <div className='py-2 px-2'>
                      <div className='group flex flex-col px-4 py-2 text-sm leading-5 rounded-md font-medium text-gray-900 bg-gray-50 border border-gray-250 '>
                        Add a new brew log by pressing add brew!
                      </div>
                    </div>
                  ) : (
                    data.brew_logs.map((l, i) => (
                      <div key={i} className='py-2 mx-4'>
                        <BrewLog
                          logs={l}
                          setId={setId}
                          setBrewSelected={setBrewSelected}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SidebarMobile
