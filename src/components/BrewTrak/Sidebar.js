import { useRouteMatch, Link } from 'react-router-dom'
import BrewLog from './BrewLog'

const Sidebar = ({ data, setId, setBrewSelected }) => {
  const { url } = useRouteMatch()

  return (
    <>
      <aside className='hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200'>
        <div className='px-6 pt-6 pb-4'>
          <h2 className='text-lg font-medium text-gray-900'>Brew Trak</h2>
          <p className='mt-1 text-sm text-gray-600'>
            Search through {data.brew_logs.length} logs!
          </p>
          <form className='mt-6 flex space-x-4' action='#'>
            <div className='flex-1 min-w-0'>
              <label htmlFor='search' className='sr-only'>
                Search
              </label>
              <div className='relative rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  {/* <!-- Heroicon name: mail --> */}
                  {/* <!-- Heroicon name: search --> */}
                  <svg
                    className='h-5 w-5 text-gray-400'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <input
                  type='search'
                  name='search'
                  id='search'
                  className='focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md'
                  placeholder='Search'
                />
              </div>
            </div>
            <button
              type='submit'
              className='inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
            >
              {/* <!-- Heroicon name: filter --> */}
              <svg
                className='h-5 w-5 text-gray-400'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='sr-only'>Search</span>
            </button>
            <Link
              to={`${url}/new`}
              type='submit'
              className='inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
            >
              {/* <!-- Heroicon name: add --> */}
              <svg
                className='w-6 h-6'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='sr-only'>Search</span>
            </Link>
          </form>
        </div>
        {/* <!-- Directory list --> */}
        <nav
          className='flex-1 min-h-0 relative overflow-y-auto'
          aria-label='Directory'
        >
          <div>
            {data.brew_logs.length === 0 ? (
              <div className='py-2 px-2'>
                <div className='group flex flex-col px-4 py-2 text-sm leading-5 rounded-md font-medium text-gray-900 bg-gray-50 border border-gray-250 '>
                  Add a new brew log by pressing add brew!
                </div>
              </div>
            ) : (
              <ul className='relative z-0 divide-y divide-gray-200'>
                {data.brew_logs.map((l, i) => (
                  <li key={i}>
                    <BrewLog
                      logs={l}
                      setId={setId}
                      setBrewSelected={setBrewSelected}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar

// <div className='flex flex-col w-64 '>
//   <div className='flex flex-col h-0 flex-1 rounded-lg border-r border-gray-250 bg-blue-100'>
//     <div className='flex-1 flex flex-col pt-5 pb-4 overflow-y-auto'>
//       <Link
//         to={`${url}/new`}
//         className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 focus:ring-2 focus:ring-offset-2'
//       >
//         add brew
//       </Link>
// <div>
//   {data.brew_logs.length === 0 ? (
//     <div className='py-2 px-2'>
//       <div className='group flex flex-col px-4 py-2 text-sm leading-5 rounded-md font-medium text-gray-900 bg-gray-50 border border-gray-250 '>
//         Add a new brew log by pressing add brew!
//       </div>
//     </div>
//   ) : (
//     data.brew_logs.map((l, i) => (
//       <div key={i} className='py-2 px-2'>
//         <BrewLog
//           logs={l}
//           setId={setId}
//           setBrewSelected={setBrewSelected}
//         />
//       </div>
//     ))
//   )}
// </div>
//     </div>
//   </div>
// </div>

// These are examples for adding date separators for the logs (in the future)
/* <div className='z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500'>
<h3>A</h3>
</div>
<ul className='relative z-0 divide-y divide-gray-200'>
<li>
  <div className='relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500'>
    <div className='flex-shrink-0'>
      <img
        className='h-10 w-10 rounded-full'
        src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        alt=''
      />
    </div>
    <div className='flex-1 min-w-0'>
      <div className='focus:outline-none'>
        <span className='absolute inset-0' aria-hidden='true'></span>
        <p className='text-sm font-medium text-gray-900'>
          Leslie Abbott
        </p>
        <p className='text-sm text-gray-500 truncate'>
          Co-Founder / CEO
        </p>
      </div>
    </div>
  </div>
</li>

<li>
  <div className='relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500'>
    <div className='flex-shrink-0'>
      <img
        className='h-10 w-10 rounded-full'
        src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        alt=''
      />
    </div>
    <div className='flex-1 min-w-0'>
      <div className='focus:outline-none'>
        <span className='absolute inset-0' aria-hidden='true'></span>
        <p className='text-sm font-medium text-gray-900'>
          Hector Adams
        </p>
        <p className='text-sm text-gray-500 truncate'>
          VP, Marketing
        </p>
      </div>
    </div>
  </div>
</li>

<li>
  <div className='relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500'>
    <div className='flex-shrink-0'>
      <img
        className='h-10 w-10 rounded-full'
        src='https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        alt=''
      />
    </div>
    <div className='flex-1 min-w-0'>
      <div className='focus:outline-none'>
        <span className='absolute inset-0' aria-hidden='true'></span>
        <p className='text-sm font-medium text-gray-900'>
          Blake Alexander
        </p>
        <p className='text-sm text-gray-500 truncate'>
          Account Coordinator
        </p>
      </div>
    </div>
  </div>
</li>

<li>
  <div className='relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500'>
    <div className='flex-shrink-0'>
      <img
        className='h-10 w-10 rounded-full'
        src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        alt=''
      />
    </div>
    <div className='flex-1 min-w-0'>
      <div className='focus:outline-none'>
        <span className='absolute inset-0' aria-hidden='true'></span>
        <p className='text-sm font-medium text-gray-900'>
          Fabricio Andrews
        </p>
        <p className='text-sm text-gray-500 truncate'>
          Senior Art Director
        </p>
      </div>
    </div>
  </div>
</li>
</ul>

<div className='z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500'>
<h3>B</h3>
</div>
<ul className='relative z-0 divide-y divide-gray-200'>
<li>
  <div className='relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500'>
    <div className='flex-shrink-0'>
      <img
        className='h-10 w-10 rounded-full'
        src='https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        alt=''
      />
    </div>
    <div className='flex-1 min-w-0'>
      <div className='focus:outline-none'>
        <span className='absolute inset-0' aria-hidden='true'></span>
        <p className='text-sm font-medium text-gray-900'>
          Angela Beaver
        </p>
        <p className='text-sm text-gray-500 truncate'>
          Chief Strategy Officer
        </p>
      </div>
    </div>
  </div>
</li>

<li>
  <div className='relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500'>
    <div className='flex-shrink-0'>
      <img
        className='h-10 w-10 rounded-full'
        src='https://images.unsplash.com/photo-1506980595904-70325b7fdd90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        alt=''
      />
    </div>
    <div className='flex-1 min-w-0'>
      <div className='focus:outline-none'>
        <span className='absolute inset-0' aria-hidden='true'></span>
        <p className='text-sm font-medium text-gray-900'>
          Yvette Blanchard
        </p>
        <p className='text-sm text-gray-500 truncate'>
          Studio Artist
        </p>
      </div>
    </div>
  </div>
</li>

<li>
  <div className='relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500'>
    <div className='flex-shrink-0'>
      <img
        className='h-10 w-10 rounded-full'
        src='https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        alt=''
      />
    </div>
    <div className='flex-1 min-w-0'>
      <div className='focus:outline-none'>
        <span className='absolute inset-0' aria-hidden='true'></span>
        <p className='text-sm font-medium text-gray-900'>
          Lawrence Brooks
        </p>
        <p className='text-sm text-gray-500 truncate'>
          Content Specialist
        </p>
      </div>
    </div>
  </div>
</li>
</ul>

<div className='z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500'>
<h3>C</h3>
</div>
<ul className='relative z-0 divide-y divide-gray-200'>
<li>
  <div className='relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500'>
    <div className='flex-shrink-0'>
      <img
        className='h-10 w-10 rounded-full'
        src='https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        alt=''
      />
    </div>
    <div className='flex-1 min-w-0'>
      <div className='focus:outline-none'>
        <span className='absolute inset-0' aria-hidden='true'></span>
        <p className='text-sm font-medium text-gray-900'>
          Jeffrey Clark
        </p>
        <p className='text-sm text-gray-500 truncate'>
          Senior Art Director
        </p>
      </div>
    </div>
  </div>
</li>

<li>
  <div className='relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500'>
    <div className='flex-shrink-0'>
      <img
        className='h-10 w-10 rounded-full'
        src='https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        alt=''
      />
    </div>
    <div className='flex-1 min-w-0'>
      <div className='focus:outline-none'>
        <span className='absolute inset-0' aria-hidden='true'></span>
        <p className='text-sm font-medium text-gray-900'>
          Kathryn Cooper
        </p>
        <p className='text-sm text-gray-500 truncate'>
          Associate Creative Director
        </p>
      </div>
    </div>
  </div>
</li>
</ul>  */
