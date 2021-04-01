import { useState } from 'react'
import { Link } from 'react-router-dom'
import { roundToHalfOrWhole } from 'helper/math'
import { StageSection } from 'components/Stage'
import { Rating } from 'components/Badge'
import { All, Create, Edit } from 'components/Recipe/Review'
import { DataSection } from 'components/Layout/Detail'

export const Description = ({
  brew_type,
  bean_weight,
  bean_grind,
  water_amount,
  water_temp,
  bean_name_free,
  recipe_reviews_aggregate,
  about,
  device,
  instructions,
}) => (
  <>
    <DataSection className='sm:col-span-1' label='Brew Type'>
      {brew_type}
    </DataSection>
    <DataSection className='sm:col-span-1' label='Bean'>
      {bean_name_free ? bean_name_free : 'N/A'}
    </DataSection>
    <DataSection className='sm:col-span-1' label='Bean Weight'>
      {bean_weight}g
    </DataSection>
    <DataSection className='sm:col-span-1' label='Bean Grind'>
      {bean_grind}
    </DataSection>
    <DataSection className='sm:col-span-1' label='Water Amount'>
      {water_amount}g
    </DataSection>
    <DataSection className='sm:col-span-1' label='Water Temp'>
      {water_temp}F
    </DataSection>
    <DataSection className='sm:col-span-1' label='Rating'>
      <Rating
        value={roundToHalfOrWhole(
          recipe_reviews_aggregate.aggregate.avg.rating
        )}
      />
    </DataSection>
    <DataSection className='sm:col-span-1' label='Device'>
      {device ? device : 'N/A'}
    </DataSection>
    <DataSection className='sm:col-span-2' label='About'>
      {about ? about : 'N/A'}
    </DataSection>
    <DataSection
      className='sm:col-span-2 whitespace-pre-line'
      label='Instructions'
    >
      {instructions}
    </DataSection>
  </>
)

export const ActivitySection = ({ stages, playerPath }) => (
  <section>
    <div className='bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6'>
      <h2 className='mb-4 text-lg font-medium text-gray-900'>Stages</h2>

      <StageSection stages={stages} playerPath={playerPath} />
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
