const TextArea = ({ label, placeholder, value, onChange }) => {
  return (
    <div className='sm:col-span-6'>
      <label
        htmlFor={label}
        className='block text-sm font-medium text-gray-700'
      >
        {label}
      </label>
      <div className='mt-1'>
        <textarea
          id={label}
          name={label}
          rows='3'
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
        ></textarea>
      </div>
    </div>
  )
}

export default TextArea
