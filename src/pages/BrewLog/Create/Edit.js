import { useMutation } from 'urql'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UPDATE_RECIPE } from 'queries/Recipe'
import Form from 'components/Recipe/Form'
import { Header, Title } from 'components/BrewLog/Form'
import { schema } from 'components/Recipe/Schema'
import { normalizeStages } from 'helper/recipe'
import { BREWLOG_FORM } from 'pages/BrewLog/Create'
import { getDefaultValues } from 'components/Utility/Form'
import { useAlert } from 'context/AlertContext'
import { recipeError } from 'helper/error'

export default function Edit({ goBack, goTo, store, setStore, payload }) {
  const { addAlert } = useAlert()
  const [, updateRecipe] = useMutation(UPDATE_RECIPE)

  const defaultValues = getDefaultValues(store.recipe)
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const { isDirty } = methods.formState

  const submitRecipe = async ({ stages, serve, ...recipe }) => {
    const { id } = store.recipe

    if (isDirty) {
      const newStages = normalizeStages(stages, serve, id)
      const { data, error } = await updateRecipe({
        id,
        recipe,
        stages: newStages,
      })

      if (error) {
        recipeError(addAlert, error, methods.setError)
        return
      } else {
        // in case user wants to go back to edit recipe
        //  using ...store in case we want to preserve other store variables such as 'createdTemplateRecipe'
        setStore({ ...store, recipe: data.update_recipe_by_pk })
      }
    }

    let brewlogPayload = { recipeId: id }
    if (store.createdTemplateRecipe) {
      brewlogPayload.templateRecipeId = payload.id
    }
    goTo(BREWLOG_FORM, brewlogPayload)
  }

  // clear store since going back from edit means you've started from scratch
  const goBackClear = () => {
    setStore({})
    goBack()
  }

  return (
    <>
      <Header goBack={goBackClear} />
      <Title
        extraClasses='mt-2'
        title='Create a brew log'
        subtitle='Create a recipe'
      />
      <Form
        {...methods}
        onCancel={goBackClear}
        onSubmit={methods.handleSubmit(submitRecipe)}
      />
    </>
  )
}
