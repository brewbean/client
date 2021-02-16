import { Link, useRouteMatch } from 'react-router-dom'
import { roundToHalfOrWhole } from 'helper/math'
import { PlaceHolder } from 'components/Icon'

const RecipeCard = ({
  id,
  brew_type,
  about,
  rating,
  date_added,
  name,
  is_private,
  barista,
  bean,
  recipe_reviews_aggregate,
}) => {
  const { url } = useRouteMatch()
  return (
    <Link
      className='flex flex-col rounded-lg shadow-lg overflow-hidden'
      to={`${url}/${id}`}
    >
      <img
        className='h-48 w-full object-cover'
        src='data:image/jpeg;base64,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'
        alt=''
      />

      <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
        <div className='flex-1'>
          <div className='text-sm font-medium text-indigo-600'>
            <div className='hover:underline'>{brew_type}</div>
          </div>
          <div className='block mt-2'>
            <div className='text-xl font-semibold text-gray-900'>{name}</div>
            <div className='mt-3 text-base text-gray-500'>{about}</div>
          </div>
        </div>
        <div className='mt-6 flex items-center'>
          {barista?.avatar ? (
            <img
              className='h-10 w-10 rounded-full'
              src={barista?.avatar}
              alt=''
            />
          ) : (
            <PlaceHolder className='h-10 w-10' />
          )}
          <div className='ml-3'>
            <div className='text-sm font-medium text-gray-900'>
              <div className='hover:underline'>{barista?.display_name}</div>
            </div>
            <div className='flex space-x-1 text-sm text-gray-500 items-center'>
              <time dateTime={date_added}>{date_added.substring(0, 10)}</time>
              <span aria-hidden='true'>&middot;</span>
              {recipe_reviews_aggregate.aggregate.avg.rating ? (
                <>
                  <span>
                    {roundToHalfOrWhole(
                      recipe_reviews_aggregate.aggregate.avg.rating
                    )}
                    /5
                  </span>
                  <svg
                    className='w-4 h-4 text-pink-500'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                </>
              ) : (
                <span className='italic'>No ratings yet!</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard
