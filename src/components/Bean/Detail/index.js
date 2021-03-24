import { Link } from 'react-router-dom'
import { All, Create, Edit } from 'components/Bean/Review'
import { Description } from './Description'
import { useState } from 'react'

export const DescriptionSection = ({ bean }) => (
  <section>
    <div className='bg-white shadow sm:rounded-lg'>
      <div className='px-4 py-5 sm:px-6'>
        <h2 className='text-lg leading-6 font-medium text-gray-900'>
          Bean Details
        </h2>
      </div>
      <div className='border-t border-gray-200 px-4 py-5 sm:px-6'>
        <Description {...bean} />
      </div>
    </div>
  </section>
)

export const CommentSection = ({ beanId, beanReviews, canReview }) => {
  const [editReview, setEditReview] = useState(null)
  const onEdit = (review) => () => setEditReview(review)
  const close = () => setEditReview(null)

  return (
    <section>
      <div className='bg-white shadow sm:rounded-lg sm:overflow-hidden'>
        <div className='divide-y divide-gray-200'>
          <div className='px-4 py-5 sm:px-6'>
            <h2 className='text-lg font-medium text-gray-900'>Bean Reviews</h2>
          </div>
          <div className='px-4 py-6 sm:px-6'>
            {beanReviews.length === 0 ? (
              <p className='text-sm text-gray-900'>No bean reviews yet</p>
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
