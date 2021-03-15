import { Link, useRouteMatch } from 'react-router-dom'
import { roundToHalfOrWhole } from 'helper/math'
import { PlaceHolder } from 'components/Icon'
import { placeholder as ImagePlaceholder } from 'image'

const RecipeCard = ({
  id,
  brew_type,
  about,
  date_added,
  name,
  barista,
  recipe_reviews_aggregate,
  bean,
  rating,
  is_private,
}) => {
  const { url } = useRouteMatch()
  return (
    <Link
      className='flex flex-col rounded-lg shadow-lg overflow-hidden'
      to={`${url}/${id}`}
    >
      <img
        className='h-48 w-full object-cover'
        src={ImagePlaceholder.recipe}
        alt='coffee-cup'
      />

      <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
        <div className='flex-1'>
          <h3 className='text-sm font-medium text-indigo-600'>{brew_type}</h3>
          <div className='block mt-1 space-y-2'>
            <h1 className='text-xl font-semibold text-gray-900'>{name}</h1>
            <h3 className='text-base text-gray-500'>{about}</h3>
          </div>
        </div>
        <div className='mt-6 flex items-center'>
          {barista?.avatar ? (
            <img
              className='h-10 w-10 rounded-full object-cover'
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
