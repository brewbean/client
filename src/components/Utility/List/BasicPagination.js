import { combineClass } from 'helper/stringHelper'
import { Link } from 'react-router-dom'
import { useQueryParams } from '../Hook'

export default function BasicPagination({ start, end, total }) {
  const { page } = useQueryParams()
  const currPage = page ? parseInt(page) : 1

  return (
    <div className='flex justify-between items-center'>
      <div>
        <p className='text-sm text-gray-700'>
          <span className='font-medium'>
            {start} - {end}
          </span>{' '}
          of <span className='font-medium'>{total}</span>
        </p>
      </div>
      <div className='space-x-2'>
        <Link
          className={combineClass('btn btn--sm btn--white', {
            'opacity-50 pointer-events-none': currPage === 1,
          })}
          to={currPage === 1 ? '#' : `?page=${currPage - 1}`}
        >
          Previous
        </Link>

        <Link
          className={combineClass('btn btn--sm btn--white', {
            'opacity-50 pointer-events-none': end === total,
          })}
          to={end < total ? `?page=${currPage + 1}` : '#'}
        >
          Next
        </Link>
      </div>
    </div>
  )
}
