const InputRow = ({ label, placeholder, value, onChange, readOnly }) => {
  return (
    <div>
      <div className='p-5 rounded-t-lg border-b border-gray-200'>
        <label className='text-sm font-bold text-gray-900 uppercase'>
          {label}
        </label>
      </div>
      <div className='p-5 rounded-b-lg'>
        <input
          className='text-xs form-input block w-full mt-1 rounded-md shadow-sm'
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          readOnly={readOnly}
        />
      </div>
    </div>
  )
}

export default InputRow
