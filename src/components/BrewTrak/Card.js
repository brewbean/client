const Card = ({ setCardValues, logs }) => {
  let card = { ...logs, name: logs.bean.name, img: logs.bean.img }
  return (
    <div
      className='group flex flex-col px-4 py-2 text-sm leading-5 rounded-md font-medium text-gray-900 bg-gray-50 border border-gray-250 '
      onClick={() => {
        setCardValues(card)
      }}
    >
      {/* <div className="flex">{logs.date}</div> */}
      <div className='flex'>{logs.date_added}</div>
      <div className='flex'>
        <div className='flex-col'>
          <div className='flex pr-1'>Type: {logs.bean.name}</div>
        </div>
        <div className='flex-col'>
          <div className='flex px-1'>{logs.bean_weight}g</div>
        </div>
        <div className='flex-col'>
          <div className='flex px-1'>{logs.water_temp}F</div>
        </div>
      </div>
      <div className='flex'>{logs.rating}/5</div>
    </div>
  )
  // return null
}

export default Card
