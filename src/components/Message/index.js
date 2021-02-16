import { alertType } from 'context/AlertContext'

export const Message = ({ type = alertType.ERROR, children }) => (
  <div className='mt-4 flex-none sm:flex justify-center'>
    <div className='flex flex-col items-center'>
      {type === alertType.ERROR && (
        <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100'>
          {/* <!-- Heroicon name: outline/exclamation --> */}
          <svg
            className='w-6 h-6 text-red-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
        </div>
      )}
      <h1 className='text-gray-900 text-xl font-medium mt-4'>{children}</h1>
    </div>
  </div>
)
