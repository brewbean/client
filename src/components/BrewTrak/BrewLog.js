import { firstInitials } from 'helper/stringHelper'
const BrewLog = ({ logs, setId, setBrewSelected }) => {
  return (
    <div>
      <div
        className='col-span-1 flex shadow-sm rounded-md'
        onClick={() => {
          setId(logs.id)
          setBrewSelected(true)
        }}
      >
        <div className='flex-shrink-0 flex items-center justify-center w-16 bg-blue-400 text-white text-sm font-medium rounded-l-md'>
          {logs.bean ? firstInitials(logs.bean?.name) : 'N/A'}
        </div>
        <div className='flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate'>
          <div className='flex-1 px-4 py-2 text-sm truncate'>
            <div className='text-gray-900 font-medium hover:text-gray-600'>
              {logs.bean ? logs.bean?.name : 'No Bean Provided'}
            </div>
            <p className='text-gray-500'>{logs.date_added}</p>
          </div>
        </div>
      </div>
    </div>
    // return (
    //   <div
    //     classNameName='group flex flex-col px-4 py-2 text-sm leading-5 rounded-md font-medium text-gray-900 bg-gray-50 border border-gray-250 '
    //     onClick={() => {
    //       setId(logs.id)
    //       setBrewSelected(true)
    //     }}
    //   >
    //     <div classNameName='flex'>{logs.date_added}</div>
    //     <div classNameName='flex'>
    //       <div classNameName='flex-col'>
    //         <div classNameName='flex pr-1'>Type: {logs.bean?.name}</div>
    //       </div>
    //       <div classNameName='flex-col'>
    //         <div classNameName='flex px-1'>{logs.bean_weight}g</div>
    //       </div>
    //       <div classNameName='flex-col'>
    //         <div classNameName='flex px-1'>{logs.water_temp}F</div>
    //       </div>
    //     </div>
    //     <div classNameName='flex'>{logs.rating}/5</div>
    //   </div>
    // )
  )
}

export default BrewLog
