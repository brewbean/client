import { useMutation } from 'urql'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { INSERT_RECIPE } from 'queries/Recipe'
import Form from 'components/Recipe/Form'
import { Header, Title } from 'components/BrewLog/Form'
import { schema } from 'components/Recipe/Schema'
import { getDefaultValues } from 'components/Utility/Form'
import { addServeToStages } from 'helper/recipe'
import { BREWLOG_FORM } from 'pages/BrewLog/Create'
import { recipeError } from 'helper/error'
import { useAlert } from 'context/AlertContext'

export default function Create({ goBack, goTo, payload, setStore }) {
  const { addAlert } = useAlert()
  const [, insertRecipe] = useMutation(INSERT_RECIPE)
  const defaultValues = getDefaultValues(payload, [
    { key: 'name', value: undefined },
    { key: 'is_private', value: true },
  ])
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const submitRecipe = async ({ stages, serve, ...recipe }) => {
    let object = { ...recipe }

    if (stages) {
      object.stages = {
        data: addServeToStages(stages, serve),
      }
    }

    const { data, error } = await insertRecipe({ object })

    if (error) {
      recipeError(addAlert, error, methods.setError)
    } else {
      setStore({ recipe: data.insert_recipe_one, createdTemplateRecipe: true }) // in case user wants to go back to edit recipe
      goTo(BREWLOG_FORM, {
        recipeId: data.insert_recipe_one.id,
        templateRecipeId: payload.id,
      })
    }
  }

  return (
    <>
      <Header goBack={goBack} />
      <Title
        extraClasses='mt-2'
        title='Create a brew log'
        subtitle='Step 3: Modify your template base'
      />
      <Form
        {...methods}
        onCancel={goBack}
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
