import { Table } from 'components/Stage'

const StageRow = ({ stages, onEdit }) => {
  return (
    <div className='py-2 px-4 rounded-md bg-gray-100 shadow-inner border-gray-300 flex justify-between items-center'>
      <Table stages={stages} />
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
