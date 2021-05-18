import { ThumbUpIcon } from '@heroicons/react/outline'

export default function Rating({ count, goToReviews }) {
  return (
    <div className='flex'>
      <button
        onClick={goToReviews}
        className='mr-3 underline text-sm text-gray-900 focus:outline-none'
      >
        See all reviews
      </button>
      <div className='flex items-center'>
        <span className='border border-green-300 inline-flex rounded-full bg-green-100 p-3 text-green-700'>
          <h3 className='text-sm font-medium pr-2'>{count}</h3>
          <ThumbUpIcon className='h-5 w-5' />
        </span>
      </div>
    </div>
  )
}
