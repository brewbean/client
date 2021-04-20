import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { All, Create, Edit } from 'components/Bean/Review'
import { Rating } from 'components/Badge'
import { roundToHalfOrWhole } from 'helper/math'
import { wordCapitalized } from 'helper/stringHelper'
import { DataSection } from 'components/Layout/Detail'
import { externalLinkPlugin } from 'helper/sanitize'

export const Description = ({
  altitude_start,
  altitude_end,
  varietal,
  process,
  profile_note,
  region,
  roast_type,
  about,
  price,
  bean_reviews_aggregate,
  purchase_info,
}) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  return (
    <>
      <DataSection className='sm:col-span-1' label='Roast Type'>
        {wordCapitalized(roast_type)}
      </DataSection>
      <DataSection className='sm:col-span-1' label='Profile Notes'>
        {profile_note}
      </DataSection>
      <DataSection className='sm:col-span-1' label='Region'>
        {region}
      </DataSection>
      <DataSection className='sm:col-span-1' label='Altitude'>
        {altitude_start && altitude_end
          ? `${altitude_start} - ${altitude_end} m`
          : altitude_start
          ? `${altitude_start} m`
          : 'N/A'}
      </DataSection>
      <DataSection className='sm:col-span-1' label='Variety'>
        {varietal ? varietal : 'N/A'}
      </DataSection>
      <DataSection className='sm:col-span-1' label='Process'>
        {process ? process : 'N/A'}
      </DataSection>
      <DataSection className='sm:col-span-1' label='Price'>
        {price ? `${formatter.format(price)}` : 'N/A'}
      </DataSection>
      <DataSection className='sm:col-span-1' label='Rating'>
        <Rating
          value={roundToHalfOrWhole(
            bean_reviews_aggregate.aggregate.avg.rating
          )}
        />
      </DataSection>
      <DataSection className='sm:col-span-2' label='About'>
        <article className='prose prose-sm prose-indigo text-gray-900'>
          <ReactMarkdown plugins={externalLinkPlugin}>
            {about ? about : 'N/A'}
          </ReactMarkdown>
        </article>
      </DataSection>
      <DataSection className='sm:col-span-2' label='Where to purchase'>
        <article className='prose prose-sm prose-indigo text-gray-900'>
          <ReactMarkdown plugins={externalLinkPlugin}>
            {purchase_info ? purchase_info : 'N/A'}
          </ReactMarkdown>
        </article>
      </DataSection>
    </>
  )
}

export const CommentSection = ({ beanId, beanReviews, canReview }) => {
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
            {beanReviews.length === 0 ? (
              <p className='text-sm text-gray-900'>No reviews yet</p>
            ) : (
              <All
                beanReviews={beanReviews}
                onEdit={onEdit}
                isEditing={editReview !== null}
              />
            )}
          </div>
        </div>
        {canReview && <Create id={beanId} />}
        {editReview && <Edit review={editReview} close={close} />}
      </div>
    </section>
  )
}

export const TitleSection = ({ dateAdded, authorName, name, companyName }) => (
  <div>
    <h1 className='text-2xl font-bold text-gray-900'>{name}</h1>
    <h2 className='text-lg font-medium text-gray-700'>{companyName}</h2>
    <h3 className='mt-2 text-sm text-gray-500'>
      Added by {authorName ? authorName : '[DELETED]'} on{' '}
      <time dateTime={dateAdded}>{dateAdded.substring(0, 10)}</time>
    </h3>
  </div>
)

export const ModifyRow = ({ canModify, editPath }) =>
  canModify ? (
    <div className='mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3'>
      <Link to={editPath} className='btn btn--primary btn--md'>
        Edit
      </Link>
    </div>
  ) : null
