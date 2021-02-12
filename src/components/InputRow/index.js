const InputRow = ({
  label,
  description,
  descriptionId,
  symbol,
  symbolPadding = '',
  type = 'text',
  ...props
}) => {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <label
          htmlFor={props.id}
          className='block text-sm font-medium text-gray-700'
        >
          {label}
        </label>
        {!props.required && (
          <p className='text-xs text-gray-500 italic'>optional</p>
        )}
      </div>
      <div className={`mt-1 ${symbol ? 'relative' : ''}`.trimEnd()}>
        <input
          {...props}
          type={type}
          className={`placeholder-gray-400 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${
            symbol ? symbolPadding : ''
          }`.trimEnd()}
          aria-describedby={descriptionId}
        />
        {symbol && (
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
            <p className='text-sm text-gray-500'>{symbol}</p>
          </div>
        )}
      </div>
      {description && (
        <p className='mt-2 text-sm text-gray-500' id={descriptionId}>
          {description}
        </p>
      )}
    </div>
  )
}

export default InputRow
