import { XCircle } from 'components/Icon'

const Row = ({ number, onRemove, children }) => (
  <div className='flex flex-wrap space-x-4 space-y-2 items-end'>
    <h1 className='w-full mt-2 sm:mt-0 sm:w-auto mb-2 mr-2 text-gray-700 font-bold'>
      {number}
    </h1>

    {children}

    {onRemove && (
      <div className='pb-2'>
        <button
          onClick={onRemove}
          className='text-red-600 hover:text-red-700 focus:outline-none rounded-full focus:ring-2 focus:ring-red-500 focus:ring-opacity-75'
        >
          <XCircle className='h-5 w-5' />
        </button>
      </div>
    )}
  </div>
)

export default Row
