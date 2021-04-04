import { useMutation } from 'urql'
import { UPDATE_RECIPE_REVIEW } from 'queries'
import { PlaceHolder } from 'components/Icon'

import Form from 'components/Recipe/Review/Form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './Schema'

const Edit = ({ review, close }) => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      comment: review.comment,
      rating: review.rating,
    },
  })

  const [, updateReview] = useMutation(UPDATE_RECIPE_REVIEW)

  const submitReview = async ({ comment, rating }) => {
    await updateReview({
      id: review.id,
      object: {
        recipe_id: review.recipe_id,
        date_updated: new Date().toISOString(),
        comment,
        rating,
      },
    })
    close()
  }

  return (
    <div className='bg-gray-50 px-4 py-6 sm:px-6'>
      <div className='flex space-x-3'>
        <div className='flex-shrink-0'>
          {review.barista?.avatar ? (
            <img
              className='h-10 w-10 rounded-full'
              src={review.barista?.avatar}
              alt=''
            />
          ) : (
            <PlaceHolder className='h-10 w-10' />
          )}
        </div>
        <div className='min-w-0 flex-1'>
          <Form {...methods} onSubmit={methods.handleSubmit(submitReview)} />
        </div>
      </div>
    </div>
  )
}

export default Edit
