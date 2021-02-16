import CoffeeCup from './Icons/coffee-cup.png'
const BrewLog = ({ logs, setId, setBrewSelected }) => {
  return (
    <div
      className='relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500'
      onClick={() => {
        setId(logs.id)
        setBrewSelected(true)
      }}
    >
      <div className='flex-shrink-0'>
        <img
          className='h-10 w-10 rounded-full'
          src={logs.bean ? logs.bean?.img : CoffeeCup}
          alt=''
        />
      </div>
      <div className='flex-1 min-w-0'>
        <div className='focus:outline-none'>
          {/* <!-- Extend touch target to entire panel --> */}
          <span className='absolute inset-0' aria-hidden='true'></span>
          <p className='text-sm font-medium text-gray-900'>
            {logs.bean
              ? logs.bean?.name
              : logs.bean_name_free
              ? logs.bean_name_free
              : 'No Bean Provided'}
          </p>
          <p className='text-sm text-gray-500 truncate'>
            {logs.date_added.substring(0, 10)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BrewLog
/* <div
        className='col-span-1 flex shadow-sm rounded-md'
        onClick={() => {
          setId(logs.id)
          setBrewSelected(true)
        }}
      >
        <div className='flex-shrink-0 flex items-center justify-center w-16 bg-blue-400 text-white text-sm font-medium rounded-l-md'>
          {logs.bean ? firstInitials(logs.bean?.name) : 'N/A'}
        </div>
        <div className='flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate'>
          <div className='flex-1 px-4 py-2 text-sm truncate'>
            <div className='text-gray-900 font-medium hover:text-gray-600'>
              {logs.bean ? logs.bean?.name : 'No Bean Provided'}
            </div>
            <p className='text-gray-500'></p>
          </div>
        </div>
      </div>
     */
// </div>
