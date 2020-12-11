import { alertType } from 'context/AlertContext'

const ErrorIcon = () => (
  <svg
    className='h-5 w-5 text-red-400'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 20 20'
    fill='currentColor'
  >
    <path
      fillRule='evenodd'
      d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
      clipRule='evenodd'
    />
  </svg>
)
const WarningIcon = () => (
  <svg
    className='h-5 w-5 text-yellow-400'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 20 20'
    fill='currentColor'
  >
    <path
      fillRule='evenodd'
      d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
      clipRule='evenodd'
    />
  </svg>
)
const SuccessIcon = () => (
  <svg
    className='h-5 w-5 text-green-400'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 20 20'
    fill='currentColor'
  >
    <path
      fillRule='evenodd'
      d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
      clipRule='evenodd'
    />
  </svg>
)
const InfoIcon = () => (
  <svg
    className='h-5 w-5 text-blue-400'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 20 20'
    fill='currentColor'
  >
    <path
      fillRule='evenodd'
      d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
      clipRule='evenodd'
    />
  </svg>
)
const CloseIcon = () => (
  <svg
    className='h-5 w-5'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 20 20'
    fill='currentColor'
  >
    <path
      fillRule='evenodd'
      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
      clipRule='evenodd'
    />
  </svg>
)

const settings = {
  [alertType.ERROR]: {
    bg: 'bg-red-100',
    icon: ErrorIcon,
    header: 'text-red-800',
    message: 'text-red-700',
    close: 'text-red-500 hover:bg-red-200 focus:bg-red-200',
  },
  [alertType.WARNING]: {
    bg: 'bg-yellow-100',
    icon: WarningIcon,
    header: 'text-yellow-800',
    message: 'text-yellow-700',
    close: 'text-yellow-500 hover:bg-yellow-200 focus:bg-yellow-200',
  },
  [alertType.SUCCESS]: {
    bg: 'bg-green-100',
    icon: SuccessIcon,
    header: 'text-green-800',
    message: 'text-green-700',
    close: 'text-green-500 hover:bg-green-200 focus:bg-green-200',
  },
  [alertType.INFO]: {
    bg: 'bg-blue-100',
    icon: InfoIcon,
    header: 'text-blue-800',
    message: 'text-blue-700',
    close: 'text-blue-500 hover:bg-blue-200 focus:bg-blue-200',
  },
}

const AlertMessage = ({ close, onClose, type, header, message }) => {
  const Icon = settings[type].icon
  return (
    <div className={`rounded-md p-4 ${settings[type].bg}`}>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <Icon />
        </div>
        <div className='ml-3'>
          <h3
            className={`text-sm leading-5 font-medium ${settings[type].header}`}
          >
            {header}
          </h3>
          <div className={`mt-2 text-sm leading-5 ${settings[type].message}`}>
            <p>{message}</p>
          </div>
        </div>
        {close && (
          <div className='ml-auto pl-3'>
            <div className='-mx-1.5 -my-1.5'>
              <button
                onClick={onClose}
                className={`inline-flex rounded-md p-1.5 focus:outline-none transition ease-in-out duration-150 ${settings[type].close}`}
                aria-label='Dismiss'
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AlertMessage
