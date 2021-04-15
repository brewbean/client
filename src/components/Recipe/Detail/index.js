import { useState } from 'react'
import { roundToHalfOrWhole } from 'helper/math'
import { StageSection } from 'components/Stage'
import { Rating } from 'components/Badge'
import { All, Create, Edit } from 'components/Recipe/Review'
import { DataSection } from 'components/Layout/Detail'
import { combineClass } from 'helper/stringHelper'
import { PrivacyIcon } from 'components/Icon'

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
      {bean_weight} g
    </DataSection>
    <DataSection className='sm:col-span-1' label='Bean Grind'>
      {bean_grind}
    </DataSection>
    <DataSection className='sm:col-span-1' label='Water Amount'>
      {water_amount} g
    </DataSection>
    <DataSection className='sm:col-span-1' label='Water Temp'>
      {water_temp} {'\u00b0C'}
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

export const TitleSection = ({
  img,
  dateAdded,
  name,
  recipeName,
  showPrivacyBadge,
  isPrivate,
}) => (
  <div className='flex items-center space-x-5'>
    <img className='h-16 w-16 rounded-lg shadow' src={img.src} alt={img.alt} />
    <div>
      <h1 className='text-2xl font-bold text-gray-900'>{recipeName}</h1>
      <div className='flex flex-col sm:flex-row'>
        <p className='text-sm font-medium text-gray-500'>
          Created by {name} on{' '}
          <time dateTime={dateAdded}>{dateAdded.substring(0, 10)}</time>
        </p>

        {showPrivacyBadge && (
          <div className='mt-1 sm:mt-0'>
            <span
              className={combineClass('sm:ml-2 badge', {
                'badge--gray': isPrivate,
                'badge--indigo': !isPrivate,
              })}
            >
              {isPrivate ? 'Private' : 'Public'}
              <PrivacyIcon isPrivate={isPrivate} className='h-3 w-3 ml-1' />
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
)
