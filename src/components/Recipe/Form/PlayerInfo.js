import { FieldError } from 'components/Form/Error'
import { Table } from 'components/Player/Form'
import { combineClass } from 'helper/stringHelper'

const PlayerInfo = ({ stages, serveTime, onEdit, errors }) => {
  return (
    <>
      <div
        className={combineClass(
          'py-2 px-4 rounded-md bg-gray-200 shadow-inner flex justify-between items-center',
          {
            'ring-2 ring-red-300 ring-offset-2': errors.stages || errors.serve,
          }
        )}
      >
        <div className='flex-1'>
          <Table stages={stages} />
          <div className='flex items-center mt-2 pt-2 mr-4 border-t border-gray-300 text-gray-700'>
            <h1 className='font-medium text-sm'>
              Serve time {String.fromCharCode(8212)} {serveTime}{' '}
              <span className='text-gray-500'>(s)</span>
            </h1>
          </div>
        </div>
        <button
          type='button'
          onClick={onEdit}
          className='inline-flex items-center px-4 py-2 bg-gray-100 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Edit
        </button>
      </div>
      <FieldError
        error={
          (errors.stages || errors.serve) && {
            message: 'Please check errors in recipe player form',
          }
        }
      />
    </>
  )
}
export default PlayerInfo
