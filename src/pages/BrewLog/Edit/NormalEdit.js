import { useMutation } from 'urql'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { UPDATE_RECIPE_WITH_STAGES } from 'queries'
import { useAlert, alertType } from 'context/AlertContext'
import { schema } from 'components/Recipe/Schema'
import RecipeForm from 'components/Recipe/Form'
import { getDefaultValues } from 'components/Utility/Form'
import { Header, Title } from 'components/BrewLog/Form'
import { addServeToStages } from 'helper/recipe'
import { BREW_LOG_EDIT } from './index'

export default function NormalEdit({ store, goTo }) {
  const { addAlert } = useAlert()
  const history = useHistory()

  const [, updateRecipe] = useMutation(UPDATE_RECIPE_WITH_STAGES)

  const defaultValues = getDefaultValues(store.brewLog.recipe)
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const { isDirty } = methods.formState

  const submitRecipe = async ({ stages, serve, ...recipe }) => {
    const { id } = store.brewLog.recipe

    if (isDirty) {
      const newStages = stages
        ? addServeToStages(stages, serve).map((s) => ({
            ...s,
            recipe_id: id,
          }))
        : [] // change 'null' to empty array to add no new stages; old stages get deleted regardless

      let { error } = await updateRecipe({
        id,
        recipe,
        stages: newStages,
      })

      if (error) {
        if (error.message.includes('Uniqueness violation')) {
          methods.setError('name', {
            message: 'This recipe name already exist',
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
    goTo(BREW_LOG_EDIT)
  }

  return (
    <>
      <Header goBack={history.goBack} />
      <Title
        extraClasses='mt-2'
        title='Edit Brew Log'
        subtitle='Please note that these changes will be viewable on your recipe as well and not just your brew log'
      />
      <RecipeForm
        {...methods}
        onCancel={history.goBack}
        onSubmit={methods.handleSubmit(submitRecipe)}
        preload={
          defaultValues.serve !== 0 && {
            formMounted: true,
            isHidden: true,
            stages: defaultValues.stages,
            serveTime: defaultValues.serve,
          }
        }
      />
    </>
  )
}
