import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/outline'
import { PlaceHolder } from 'components/Icon'

const ThumbUp = () => (
  <span className='border border-green-300 inline-flex items-center rounded-full bg-green-100 p-2'>
    <ThumbUpIcon className='h-5 w-5 text-green-700' />
  </span>
)

const ThumbDown = () => (
  <span className='border border-red-300 inline-flex items-center rounded-full bg-red-100 p-2'>
    <ThumbDownIcon className='h-5 w-5 text-red-700' />
  </span>
)

export default function ReviewBlock({ name, date, thumbUp }) {
  const dateString = new Date(date).toLocaleString('en-US', {
    timeZone: 'PST',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  return (
    <div className='col-span-1'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <PlaceHolder className='h-10 w-10' />
          <div className='flex flex-col ml-3'>
            <h3 className='text-md text-gray-900 font-medium'>{name}</h3>
            <h4 className='text-sm text-gray-600 font-light'>{dateString}</h4>
          </div>
        </div>
        <div>{thumbUp ? <ThumbUp /> : <ThumbDown />}</div>
      </div>
      <div className='mt-3 text-md text-gray-900 font-normal'>
        Gaëtan was a wonderful host! He drove me to the cottage as I was
        travelling by myself. The cottage was everything I had wished for and
        more! I had a wonderful stay!
      </div>
    </div>
  )
}
