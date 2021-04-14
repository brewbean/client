import { useMutation } from 'urql'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UPDATE_RECIPE_WITH_STAGES } from 'queries'
import Form from 'components/Recipe/Form'
import { Header, Title } from 'components/BrewLog/Form'
import { schema } from 'components/Recipe/Schema'
import { addServeToStages } from 'helper/recipe'
import { BREWLOG_FORM } from 'pages/BrewLog/Create'
import { getDefaultValues } from 'components/Utility/Form'
import { alertType, useAlert } from 'context/AlertContext'

export default function Edit({ goBack, goTo, store, setStore, payload }) {
  const { addAlert } = useAlert()
  const [, updateRecipe] = useMutation(UPDATE_RECIPE_WITH_STAGES)

  const defaultValues = getDefaultValues(store.recipe)
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const { isDirty } = methods.formState

  const submitRecipe = async ({ stages, serve, ...recipe }) => {
    const { id } = store.recipe

    if (isDirty) {
      const newStages = stages
        ? addServeToStages(stages, serve).map((s) => ({
            ...s,
            recipe_id: id,
          }))
        : [] // change 'null' to empty array to add no new stages; old stages get deleted regardless

      let { data, error } = await updateRecipe({
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
