const Dropdown = ({ label, options, noLabel = false, ...props }) => {
  return (
    <div>
      {!noLabel && (
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
      )}
      <select
        {...props}
        className='placeholder-gray-400 mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md'
      >
        {options.map(({ key, value }) => (
          <option key={key} value={value}>
            {key}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
