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
