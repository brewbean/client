import { useMutation } from 'urql'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { UPDATE_RECIPE } from 'queries/Recipe'
import { useAlert } from 'context/AlertContext'
import { schema } from 'components/Recipe/Schema'
import Form from 'components/Recipe/Form'
import { getDefaultValues } from 'components/Utility/Form'
import { normalizeStages } from 'helper/recipe'
import { recipeError } from 'helper/error'

export default function Container({ recipe }) {
  const { addAlert } = useAlert()
  const params = useParams()
  const id = parseInt(params.id)
  const history = useHistory()

  const [, updateRecipe] = useMutation(UPDATE_RECIPE)

  const defaultValues = getDefaultValues(recipe)
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const submitRecipe = async ({ stages, serve, ...recipe }) => {
    const newStages = normalizeStages(stages, serve, id)
    const { error } = await updateRecipe({
      id,
      recipe,
      stages: newStages,
    })

    if (error) {
      recipeError(addAlert, error, methods.setError)
    } else {
      history.push(`/recipe/${id}`, { edited: true })
    }
  }

  return (
    <Form
      {...methods}
      publicLocked={!defaultValues.is_private}
      onCancel={history.goBack}
      onSubmit={methods.handleSubmit(submitRecipe)}
      header={{
        title: 'Create Recipe',
        subtitle:
          'Follow the form to list out recipe steps. You may also add playable recipe steps to use the recipe player.',
      }}
      preload={
        defaultValues.serve !== 0 && {
          formMounted: true,
          isHidden: true,
          stages: defaultValues.stages,
          serveTime: defaultValues.serve,
        }
      }
    />
  )
}
