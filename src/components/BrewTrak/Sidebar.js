import { useRouteMatch, Link } from 'react-router-dom'
import BrewLog from './BrewLog'

const Sidebar = ({ data, setId, setBrewSelected }) => {
  const { url } = useRouteMatch()

  return (
    <div className='flex flex-col w-64'>
      <div className='flex flex-col h-0 flex-1 rounded-lg border-r border-gray-250 bg-blue-100'>
        <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
          <div className='flex items-center px-2 py-2 text-md leading-5 font-bold text-gray-900'>
            LOGS
          </div>
          <Link
            to={`${url}/new`}
            className='mb-4 inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150'
          >
            add brew
          </Link>
          <div>
            {data.brew_logs.length === 0 ? (
              <div className='py-2 px-2'>
                <div className='group flex flex-col px-4 py-2 text-sm leading-5 rounded-md font-medium text-gray-900 bg-gray-50 border border-gray-250 '>
                  Add a new brew log by pressing add brew!
                </div>
              </div>
            ) : (
              data.brew_logs.map((l, i) => (
                <div key={i} className='py-2 px-2'>
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
  )
}

export default Sidebar
