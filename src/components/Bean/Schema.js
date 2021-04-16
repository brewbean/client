import { string, number, object } from 'yup'

export const schema = object().shape({
  name: string().required('Bean name is required').trim(),
  company_name: string().required('Company name is required').trim(),
  roast_type: string().required('Roast type is required').trim(),
  process: string()
    .nullable(true)
    .trim()
    .transform((value) => (value === '' ? null : value)),
  region: string().required('Region is required').trim(),
  varietal: string()
    .nullable(true)
    .trim()
    .transform((value) => (value === '' ? null : value)),
  profile_note: string().required('Profile notes are required').trim(),
  about: string()
    .nullable(true)
    .trim()
    .transform((value) => (value === '' ? null : value)),
  price: number()
    .nullable(true)
    .positive()
    .transform((value) => (isNaN(value) ? null : value)),
  altitude: number()
    .nullable(true)
    .min(0)
    .transform((value) => (isNaN(value) ? null : value)),
  purchase_info: string()
    .nullable(true)
    .trim()
    .transform((value) => (value === '' ? null : value)),
})
