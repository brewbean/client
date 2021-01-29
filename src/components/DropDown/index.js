const Dropdown = ({ label, value, onChange, options }) => {
  return (
    <div>
      <label for='location' class='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <select
        id='location'
        name='location'
        class='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
      >
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
/* <div>
<div className='p-5 rounded-t-lg border-b border-gray-200'>
  <label className='text-sm font-bold text-gray-900 uppercase'>
    {label}
  </label>
</div>
<div className='p-5 rounded-b-lg'>
  <div className='border p-3 rounded'>
    <select
      className='rounded w-full focus:outline-none'
      value={value}
      onChange={onChange}
    >
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  </div>
</div>
</div>
 */
