import { FieldError } from 'components/Form/Error'

const TwoColumnInput = ({
  error,
  htmlFor,
  isOptional,
  symbol,
  description,
  descriptionId,
  label,
  children,
}) => (
  <div>
    <div className='flex justify-between items-center'>
      <label
        htmlFor={htmlFor}
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      {isOptional && <p className='text-xs text-gray-500 italic'>optional</p>}
    </div>
    <div className={`mt-1 ${symbol ? 'relative' : ''}`.trimEnd()}>
      {children}
      {symbol && (
        <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
          <p className='text-sm text-gray-500'>{symbol}</p>
        </div>
      )}
    </div>
    {error && <FieldError error={error} />}
    {description && (
      <p className='mt-2 text-sm text-gray-500' id={descriptionId}>
        {description}
      </p>
    )}
  </div>
)

export default TwoColumnInput
