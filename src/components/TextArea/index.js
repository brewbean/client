const TextArea = ({ label, placeholder, value, onChange }) => {
  return (
    <div class='sm:col-span-6'>
      <label for={label} class='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <div class='mt-1'>
        <textarea
          id={label}
          name={label}
          rows='3'
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          class='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
        ></textarea>
      </div>
    </div>
  )
}

export default TextArea
