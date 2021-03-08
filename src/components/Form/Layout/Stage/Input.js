const Input = ({ htmlFor, label, symbol, children }) => (
  <div>
    {label && (
      <label
        htmlFor={htmlFor}
        className='mb-1 block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
    )}
    <div className={`w-24 ${symbol ? 'relative' : ''}`.trimEnd()}>
      {children}
      {symbol && (
        <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
          <p className='text-sm text-gray-500'>{symbol}</p>
        </div>
      )}
    </div>
  </div>
)

export default Input
