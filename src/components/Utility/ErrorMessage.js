import { ExclamationCircleIcon } from '@heroicons/react/solid'

const ErrorMessage = ({ message }) => (
  <div className='text-red-600 flex flex-col items-center'>
    <ExclamationCircleIcon className='w-6 h-6' />
    <h1 className='mt-2 text-sm font-medium'>{message}</h1>
  </div>
)
export default ErrorMessage
