import { string, number, object } from 'yup'

export const schema = object().shape({
  title: string().trim().required('Title is required'),
  comment: string().nullable(true).trim(),
  rating: number()
    .min(0, 'Must be greater than or equal to 0')
    .max(5, 'Must be less than or equal to 5')
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Rating is required'),
})
