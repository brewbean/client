import { useMutation } from 'urql'
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { UPDATE_RECIPE_WITH_STAGES } from 'queries'
import { useAlert, alertType } from 'context/AlertContext'
import { schema } from 'components/Recipe/Schema'
import Form from 'components/Recipe/Form'
import { getDefaultValues } from 'components/Utility/Form'
import { addServeToStages } from 'helper/recipe'

export default function Container({ recipe }) {
  const { addAlert } = useAlert()
  const { id } = useParams()
  const history = useHistory()

  const [, updateRecipe] = useMutation(UPDATE_RECIPE_WITH_STAGES)

  const defaultValues = getDefaultValues(recipe)
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const submitRecipe = async ({ stages, serve, ...recipe }) => {
    const newStages = stages
      ? addServeToStages(stages, serve).map((s) => ({ ...s, recipe_id: id }))
      : [] // change 'null' to empty array to add no new stages; old stages get deleted regardless

    let { error } = await updateRecipe({
      id,
      recipe,
      stages: newStages,
    })

    if (error) {
      addAlert({
        type: alertType.ERROR,
        header: error.message,
        close: true,
      })
    } else {
      history.push(`/recipe/${id}`, { edited: true })
    }
  }

  return (
    <Form
      {...methods}
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
