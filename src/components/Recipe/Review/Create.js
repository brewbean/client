import { useMutation } from 'urql'
import { INSERT_RECIPE_REVIEW } from 'queries/Recipe'
import { useAuth } from 'context/AuthContext'
import { PlaceHolder } from 'components/Icon'

import Form from 'components/Recipe/Review/Form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './Schema'

const Create = ({ id }) => {
  const { barista } = useAuth()

  const methods = useForm({
    resolver: yupResolver(schema),
  })

  const [, insertRecipeReview] = useMutation(INSERT_RECIPE_REVIEW)

  const submitReview = async ({ rating, comment }) => {
    await insertRecipeReview({
      object: {
        recipe_id: id,
        rating,
        comment,
      },
    })
  }

  return (
    <div className='bg-gray-50 px-4 py-6 sm:px-6'>
      <div className='flex space-x-3'>
        <div className='flex-shrink-0'>
          {barista?.avatar ? (
            <img
              className='h-10 w-10 rounded-full'
              src={barista?.avatar}
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

export default Create
