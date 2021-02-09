import { wordCapitalized } from 'helper/stringHelper'

const StageRow = ({ stages, onEdit }) => {
  return (
    <div className='py-2 px-4 rounded-md bg-gray-100 shadow-inner border-gray-300 flex justify-between items-center'>
      <table className='table-auto flex-1 text-sm text-gray-700'>
        <thead className='text-left text-gray-500'>
          <tr>
            <th className='font-normal'>Action</th>
            <th className='font-normal'>Start (s)</th>
            <th className='font-normal'>End (s)</th>
            <th className='font-normal'>Weight (g)</th>
          </tr>
        </thead>
        <tbody className='font-medium'>
          {stages.map((stage, i) => (
            <tr key={i}>
              <td>{wordCapitalized(stage.action)}</td>
              <td>{stage.start}</td>
              <td>{stage.end}</td>
              <td>{stage.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type='button'
        onClick={onEdit}
        className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
      >
        Edit
      </button>
    </div>
  )
}
export default StageRow
