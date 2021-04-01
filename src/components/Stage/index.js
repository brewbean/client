import { Link } from 'react-router-dom'
import { XCircle } from 'components/Icon'
import { wordCapitalized } from 'helper/stringHelper'

export const Table = ({ stages }) => (
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
)

export const StageSection = ({ stages, playerPath }) =>
  stages.length > 0 ? (
    <>
      <div className='mb-4 flex p-2 rounded-md bg-gray-50 shadow-inner border-gray-300'>
        <Table stages={stages} />
      </div>
      <Link
        to={playerPath}
        type='button'
        className='w-full btn btn--primary btn--md'
      >
        Go to Recipe Player
      </Link>
    </>
  ) : (
    <p className='text-sm text-gray-900 inline-flex items-center'>
      <XCircle className='w-6 h-6 text-red-600 mr-1' />
      No playable steps
    </p>
  )
