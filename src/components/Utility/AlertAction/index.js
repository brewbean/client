import { Check, X, DotsHorizontal } from 'components/Icon'

export const Success = ({ message, colorClass }) => (
  <div className='flex items-center'>
    <Check className='h-5 w-5 text-green-600' />
    <p className={`ml-1 text-sm font-medium ${colorClass}`}>{message}</p>
  </div>
)

export const Fail = ({ message, colorClass }) => (
  <div className='flex items-center'>
    <X className='h-5 w-5 text-red-600' />
    <p className={`ml-1 text-sm font-medium ${colorClass}`}>{message}</p>
  </div>
)

export const Load = () => (
  <DotsHorizontal className='h-5 w-5 text-indigo-600 animate-pulse' />
)
