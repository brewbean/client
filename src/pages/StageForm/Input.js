export const TimeInput = ({
  id,
  label,
  name,
  onChange,
  value,
  min,
  disabled,
  className,
}) => (
  <div className={className}>
    <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
      {label}
    </label>
    <div className='relative mt-1 w-24'>
      <input
        type='number'
        id={id}
        name={name}
        disabled={disabled}
        onChange={onChange}
        value={value}
        min={min}
        className='disabled:opacity-50 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
      />
      <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
        <p className='text-sm text-gray-500'>sec</p>
      </div>
    </div>
  </div>
)

export const WeightInput = ({
  id,
  label,
  name,
  onChange,
  value,
  min,
  disabled,
  className,
}) => (
  <div className={className}>
    <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
      {label}
    </label>
    <div className='relative mt-1 w-24'>
      <input
        type='number'
        id={id}
        name={name}
        disabled={disabled}
        onChange={onChange}
        value={value}
        min={min}
        className='disabled:opacity-50  \block w-full pl-3 pr-7 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
      />
      <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
        <p className='text-sm text-gray-500'>g</p>
      </div>
    </div>
  </div>
)

export const SelectAction = ({
  id,
  name,
  label,
  defaultValue,
  value,
  onChange,
  disabled,
  className,
}) => (
  <div className={className}>
    <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
      {label}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      disabled={disabled}
      className='disabled:opacity-50 mt-1 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
    >
      <option value='pour'>Pour</option>
      <option value='serve'>Serve</option>
    </select>
  </div>
)
