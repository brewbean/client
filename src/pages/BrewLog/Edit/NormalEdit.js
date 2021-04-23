import { useMutation } from 'urql'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { UPDATE_RECIPE } from 'queries/Recipe'
import { useAlert } from 'context/AlertContext'
import { schema } from 'components/Recipe/Schema'
import RecipeForm from 'components/Recipe/Form'
import { getDefaultValues } from 'components/Utility/Form'
import { Header, Title } from 'components/BrewLog/Form'
import { normalizeStages } from 'helper/recipe'
import { BREW_LOG_EDIT } from './index'
import { recipeError } from 'helper/error'

export default function NormalEdit({ store, goTo }) {
  const { addAlert } = useAlert()
  const history = useHistory()

  const [, updateRecipe] = useMutation(UPDATE_RECIPE)

  const defaultValues = getDefaultValues(store.brewLog.recipe)
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const { isDirty } = methods.formState

  const submitRecipe = async ({ stages, serve, ...recipe }) => {
    const { id } = store.brewLog.recipe

    if (isDirty) {
      const newStages = normalizeStages(stages, serve, id)
      const { error } = await updateRecipe({
        id,
        recipe,
        stages: newStages,
      })

      if (error) {
        recipeError(addAlert, error, methods.setError)
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
        publicLocked={!defaultValues.is_private}
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
