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
