const TextArea = ({ label, placeholder, value, onChange }) => {

  return (
  <div>
    <div className="p-5 rounded-t-lg border-b border-gray-200">
      <label className="text-sm font-bold text-gray-900 uppercase">{label}</label>
    </div>
    <div className="p-5 rounded-b-lg">
      <textarea value={value} placeholder={placeholder} onChange={onChange} className="p-3 h-40 text-gray-900 focus:bg-gray-100 rounded w-full border focus:outline-none" />
    </div>
  </div>
)}

export default TextArea;