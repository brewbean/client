const InputRow = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly,
  description,
}) => {
  return (
    <div>
      <label for={label} class='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <div class='mt-1'>
        <input
          type='text'
          name={label}
          id={label}
          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
          aria-describedby='email-description'
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          readOnly={readOnly}
        />
      </div>
      <p class='mt-2 text-sm text-gray-500' id='email-description'>
        {description}
      </p>
    </div>
  )
}

export default InputRow
