export const Rating = ({ value }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      value === null
        ? 'bg-gray-300 text-gray-800'
        : value >= 4
        ? 'bg-green-200 text-green-800'
        : value >= 3
        ? 'bg-yellow-200 text-yellow-800'
        : 'bg-red-200 text-red-800'
    }`}
  >
    {value ? value : 'not rated'}
  </span>
)
