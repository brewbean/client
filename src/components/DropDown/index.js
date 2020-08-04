import React from 'react'

const Dropdown = ({ label, value, onChange, options }) => {

  return (
    <div>
      <div className="p-5 rounded-t-lg border-b border-gray-200">
        <label className="text-sm font-bold text-gray-900 uppercase">{label}</label>
      </div>
      <div className="p-5 rounded-b-lg">
        <div className="border p-3 rounded">
          <select className="rounded w-full focus:outline-none" value={value} onChange={onChange}>
            { options.map(value => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Dropdown;