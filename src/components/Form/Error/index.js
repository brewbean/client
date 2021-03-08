import { Exclamation } from 'components/Icon'

export const FieldError = ({ error }) =>
  error ? (
    <div className='mt-1 flex items-center text-red-600'>
      <Exclamation className='w-5 h-5' />
      <p className='ml-1 text-sm'>{error.message}</p>
    </div>
  ) : null
