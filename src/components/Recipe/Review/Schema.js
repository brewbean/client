import { object, string, number } from 'yup'

export const schema = object().shape({
  comment: string().required('Comment is a required field.').trim(),
  rating: number().positive().integer().required(),
})
