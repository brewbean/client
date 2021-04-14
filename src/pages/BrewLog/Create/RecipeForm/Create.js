import { useMutation } from 'urql'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { INSERT_RECIPES_ONE } from 'queries'
import Form from 'components/Recipe/Form'
import { Header, Title } from 'components/BrewLog/Form'
import { schema } from 'components/Recipe/Schema'
import { addServeToStages } from 'helper/recipe'
import { BREWLOG_FORM } from 'pages/BrewLog/Create'

export default function Create({ goBack, goTo, setStore }) {
  const [, insertRecipe] = useMutation(INSERT_RECIPES_ONE)
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

    if (error?.message.includes('Uniqueness violation')) {
      methods.setError('name', {
        message: 'Recipe name must be unique',
        shouldFocus: true,
      })
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
