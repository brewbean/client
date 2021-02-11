const TextArea = ({ label, ...props }) => {
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
      <div className='mt-1'>
        <textarea
          name={label}
          rows='3'
          className='placeholder-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
          {...props}
        ></textarea>
      </div>
    </div>
  )
}

export default TextArea
