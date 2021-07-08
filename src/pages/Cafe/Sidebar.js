export default function Sidebar({ hours, phoneNumber, website, location }) {
  const days = [
    ['Mon', 'mon'],
    ['Tue', 'tue'],
    ['Wed', 'wed'],
    ['Thu', 'thu'],
    ['Fri', 'fri'],
    ['Sat', 'sat'],
    ['Sun', 'sun'],
  ]
  return (
    <div className='space-y-6'>
      <div>
        <div className='flex justify-end mb-2'>
          <h1 className='text-lg font-medium text-gray-900'>Store Hours</h1>
        </div>

        <div className='flex justify-end'>
          <div className='mr-4'>
            {days.map((day) => (
              <h2 key={day[0]} className='text-md font-semibold text-gray-900'>
                {day[0]}
              </h2>
            ))}
          </div>
          <div>
            {days.map((day) => {
              const time = hours[day[1]]
              return (
                <h2 key={day[1]} className='text-md font-light text-gray-900'>
                  {time.from ? time.from + ' \u2014 ' + time.to : 'CLOSED'}
                </h2>
              )
            })}
          </div>
        </div>
      </div>
      <div>
        <div className='flex justify-end mb-2'>
          <h1 className='text-lg font-medium text-gray-900'>Location</h1>
        </div>
        <div className='flex justify-end'>
          <a
            href={location.link}
            target='_blank'
            rel='noopener noreferrer'
            className='text-right underline whitespace-pre text-md font-light text-gray-900 hover:text-indigo-700'
          >
            {location.text}
          </a>
        </div>
      </div>

      {phoneNumber && (
        <div>
          <div className='flex flex-col items-end text-gray-900'>
            <h1 className='text-lg font-medium mb-2'>Phone</h1>
            <h2 className='text-md font-light'>{phoneNumber}</h2>
          </div>
        </div>
      )}

      <div>
        <div className='flex flex-col items-end text-gray-900'>
          <h1 className='text-lg font-medium mb-2'>Website</h1>
          <a
            href={website.link}
            target='_blank'
            rel='noopener noreferrer'
            className='text-md underline font-light hover:text-indigo-700'
          >
            {website.text}
          </a>
        </div>
      </div>
    </div>
  )
}
