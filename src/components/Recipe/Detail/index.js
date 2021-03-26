import { Link } from 'react-router-dom'
import { InfoCircleSolid } from 'components/Icon'
import { Table } from 'components/Stage'
import { All, Create, Edit } from 'components/Recipe/Review'
import { Description } from './Description'
import { useState } from 'react'

export const DescriptionSection = ({ recipe }) => (
  <section>
    <div className='bg-white shadow sm:rounded-lg'>
      <div className='px-4 py-5 sm:px-6'>
        <h2 className='text-lg leading-6 font-medium text-gray-900'>
          Recipe Details
        </h2>
      </div>
      <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>
        <Description {...recipe} />
      </div>
    </div>
  </section>
)

export const ActivitySection = ({ stages, playerPath }) => (
  <section>
    <div className='space-y-4 bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6'>
      <h2 className='text-lg font-medium text-gray-900'>Stages</h2>

      {stages.length > 0 ? (
        <>
          <div className='flex p-2 rounded-md bg-gray-50 shadow-inner border-gray-300'>
            <Table stages={stages} />
          </div>
          <Link
            to={playerPath}
            type='button'
            className='w-full btn btn--primary btn--md'
          >
            Go to Recipe Player
          </Link>
        </>
      ) : (
        <p className='text-sm text-gray-900 inline-flex items-start'>
          <InfoCircleSolid className='w-6 h-6 text-indigo-500 mr-2' />
          This recipe does not contain a playable format
        </p>
      )}
    </div>
  </section>
)

export const CommentSection = ({ recipeId, recipeReviews, canReview }) => {
  const [editReview, setEditReview] = useState(null)
  const onEdit = (review) => () => setEditReview(review)
  const close = () => setEditReview(null)

  return (
    <section>
      <div className='bg-white shadow sm:rounded-lg sm:overflow-hidden'>
        <div className='divide-y divide-gray-200'>
          <div className='px-4 py-5 sm:px-6'>
            <h2 className='text-lg font-medium text-gray-900'>Reviews</h2>
          </div>
          <div className='px-4 py-6 sm:px-6'>
            {recipeReviews.length === 0 ? (
              <p className='text-sm text-gray-900'>No reviews available</p>
            ) : (
              <All
                recipe_reviews={recipeReviews}
                onEdit={onEdit}
                isEditing={editReview !== null}
              />
            )}
          </div>
        </div>
        {canReview && <Create id={recipeId} />}
        {editReview && <Edit review={editReview} close={close} />}
      </div>
    </section>
  )
}

export const TitleSection = ({ img, dateAdded, name, recipeName }) => (
  <div className='flex items-center space-x-5'>
    <img className='h-16 w-16 rounded-lg shadow' src={img.src} alt={img.alt} />
    <div>
      <h1 className='text-2xl font-bold text-gray-900'>{recipeName}</h1>
      <p className='text-sm font-medium text-gray-500'>
        Created by {name} on{' '}
        <time dateTime={dateAdded}>{dateAdded.substring(0, 10)}</time>
      </p>
    </div>
  </div>
)

export const ModifyRow = ({ canModify, onDelete, editPath }) =>
  canModify ? (
    <div className='mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3'>
      <button
        onClick={onDelete}
        type='button'
        className='btn btn--white btn--md'
      >
        Delete Recipe
      </button>
      <Link to={editPath} className='btn btn--primary btn--md'>
        Edit Recipe
      </Link>
    </div>
  ) : null
