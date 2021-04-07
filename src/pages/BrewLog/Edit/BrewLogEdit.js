import { useAlert, alertType } from 'context/AlertContext'
import { useParams, useHistory } from 'react-router-dom'
import { Form as BrewLogForm, Header, Title } from 'components/BrewLog/Form'
import { UPDATE_BREW_LOG } from 'queries'
import { useMutation } from 'urql'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { schema } from 'components/BrewLog/Schema'

export default function BrewLogEdit({ goBack, store, payload }) {
  const { addAlert } = useAlert()
  const { id } = useParams()
  const history = useHistory()

  const [, updateBrewLog] = useMutation(UPDATE_BREW_LOG)

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: store.brewLog,
  })

  const { isDirty } = methods.formState

  const submitBrewLog = async (brew_log) => {
    if (isDirty) {
      if (payload?.recipe && payload?.templateRecipeId) {
        brew_log.recipe_id = payload.recipe.id
        brew_log.template_recipe_id = payload.templateRecipeId
      }
      const { error } = await updateBrewLog(
        {
          id,
          brew_log,
        },
        {
          fetchOptions: {
            headers: {
              'x-hasura-role': 'all_barista',
            },
          },
        }
      )
      if (error) {
        if (error.message.includes('Uniqueness violation')) {
          methods.setError('title', {
            message: 'This brew log title already exist',
            shouldFocus: true,
          })
        } else {
          addAlert({
            type: alertType.ERROR,
            header: error.message,
            close: true,
          })
        }
        return
      }
    }
    history.push(`/brewlog/${id}`, { edited: true })
  }

  return (
    <>
      <Header goBack={goBack} />
      <Title
        extraClasses='mt-2'
        title='Edit Brew Log'
        subtitle='Continued: complete brew log changes'
      />
      <BrewLogForm
        {...methods}
        onSubmit={methods.handleSubmit(submitBrewLog)}
      />
    </>
  )
}
