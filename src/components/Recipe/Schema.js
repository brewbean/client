import { array, boolean, string, number, object } from 'yup'

export const schema = object().shape({
  name: string().required('Recipe name is a required field').trim(),
  about: string()
    .nullable(true)
    .trim()
    .transform((value) => (value === '' ? null : value)),
  bean_name_free: string()
    .nullable(true)
    .trim()
    .transform((value) => (value === '' ? null : value)),
  bean_weight: number()
    .min(1, 'Must be greater than 0')
    .max(100, 'Must be less than or equal to 100')
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Coffee bean amount is required'),
  bean_grind: string().required(),
  brew_type: string().required(),
  device: string()
    .nullable(true)
    .trim()
    .transform((value) => (value === '' ? null : value)),
  water_amount: number()
    .min(1, 'Must be greater than 0')
    .max(500, 'Must be less than or equal to 500')
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Serving amount is required'),
  water_temp: number()
    .min(1, 'Must be greater than 0')
    .max(150, 'Must be less than or equal to 150')
    .transform((value) => (isNaN(value) ? undefined : value))
    .required('Water temperature is required'),
  instructions: string().required('Instructions are required').trim(),
  is_private: boolean().required(),
  stages: array(
    object({
      action: string().required(),
      start: number().min(0).required(),
      end: number().min(1).required(),
      weight: number().min(1).required(),
    })
      .test(
        'is-row-time-valid',
        'start time is not less than end time',
        (item) => item.start < item.end
      )
      .test(
        'is-row-valid-with-prev-end-time',
        'start time is not equal or greater than previous row end time',
        function (item) {
          const index = parseInt(this.path.split('[')[1].split(']')[0], 10) // `this.path` -> 'stages[0]'
          const stages = this.parent
          const prevItem = stages[index - 1]

          return index === 0 || prevItem.end <= item.start
        }
      )
      .test(
        'is-row-valid-with-prev-weight',
        'weight not greater than previous row weight',
        function (item) {
          const index = parseInt(this.path.split('[')[1].split(']')[0], 10) // `this.path` -> 'stages[0]'
          const stages = this.parent
          const prevItem = stages[index - 1]

          return index === 0 || prevItem.weight < item.weight
        }
      )
  ).optional(),
  serve: number()
    .when('stages', (stages, schema) => {
      if (stages) {
        const min = stages[stages.length - 1].end
        return schema.min(min)
      }
      return schema.min(0)
    })
    .optional(),
})
