import { useMutation } from 'urql'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { INSERT_RECIPE } from 'queries/Recipe'
import Form from 'components/Recipe/Form'
import { Header, Title } from 'components/BrewLog/Form'
import { schema } from 'components/Recipe/Schema'
import { addServeToStages } from 'helper/recipe'
import { BREWLOG_FORM } from 'pages/BrewLog/Create'
import { useAlert } from 'context/AlertContext'
import { recipeError } from 'helper/error'

export default function Create({ goBack, goTo, setStore }) {
  const { addAlert } = useAlert()
  const [, insertRecipe] = useMutation(INSERT_RECIPE)
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { is_private: true },
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
      // in case user wants to go back to edit recipe
      setStore({ recipe: data.insert_recipe_one, createdRecipeScratch: true })
      goTo(BREWLOG_FORM, {
        recipeId: data.insert_recipe_one.id,
      })
    }
  }

  return (
    <>
      <Header goBack={goBack} />
      <Title
        extraClasses='mt-2'
        title='Create a brew log'
        subtitle='Step 2: Create a recipe'
      />
      <Form
        {...methods}
        onCancel={goBack}
        onSubmit={methods.handleSubmit(submitRecipe)}
      />
    </>
  )
}
