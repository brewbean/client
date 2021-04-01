export const Rating = ({ value }) => (
  <span
    className={`badge ${
      value === null
        ? 'badge--gray'
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
