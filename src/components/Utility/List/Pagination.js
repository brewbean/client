import { ArrowNarrowLeft, ArrowNarrowRight } from 'components/Icon'
import { combineClass } from 'helper/stringHelper'
import qs from 'qs'
import { useHistory, useLocation } from 'react-router'

export default function Pagination({ pageNumbers }) {
  const { search } = useLocation()
  const history = useHistory()
  const { page } = qs.parse(search, { ignoreQueryPrefix: true })

  const lastPage = pageNumbers[pageNumbers.length - 1]

  const navigateToPage = (num) => {
    history.push({
      search: '?page=' + num,
    })
  }

  const moveLeft = () => {
    navigateToPage(parseInt(page) - 1)
  }
  const moveRight = () => {
    navigateToPage(page ? parseInt(page) + 1 : 2)
  }

  return (
    <div className='flex justify-center items-center'>
      {page > 1 && (
        <button className='focus:outline-none' onClick={moveLeft}>
          <ArrowNarrowLeft className='mr-4 h-5 w-5 text-indigo-500' />
        </button>
      )}

      <div className='space-x-2 text-gray-900 text-md font-medium'>
        {pageNumbers.map((num) => {
          const disabled =
            (num === 1 && page === undefined) || num === parseInt(page)
          return (
            <button
              key={num}
              className={combineClass(
                'h-8 w-8 rounded-full hover:bg-indigo-100 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                {
                  'pointer-events-none bg-indigo-200 text-indigo-800 font-medium': disabled,
                }
              )}
              disabled={disabled}
              onClick={() => navigateToPage(num)}
            >
              {num}
            </button>
          )
        })}
      </div>

      {parseInt(page) !== lastPage && (
        <button className='focus:outline-none' onClick={moveRight}>
          <ArrowNarrowRight className='ml-4 h-5 w-5 text-indigo-500' />
        </button>
      )}
    </div>
  )
}
