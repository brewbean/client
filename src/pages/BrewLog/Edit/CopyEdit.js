import { useMutation } from 'urql'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { INSERT_RECIPE } from 'queries/Recipe'
import Form from 'components/Recipe/Form'
import { Header, Title } from 'components/BrewLog/Form'
import { schema } from 'components/Recipe/Schema'
import { getDefaultValues } from 'components/Utility/Form'
import { addServeToStages } from 'helper/recipe'
import { BREW_LOG_EDIT } from './index'

export default function CopyEdit({ goBack, goTo, store }) {
  const [, insertRecipe] = useMutation(INSERT_RECIPE)
  const defaultValues = getDefaultValues(store.brewLog.recipe, [
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

    if (error?.message.includes('Uniqueness violation')) {
      methods.setError('name', {
        message: 'Recipe name must be unique',
        shouldFocus: true,
      })
    } else {
      goTo(BREW_LOG_EDIT, {
        recipe: data.insert_recipe_one,
        templateRecipeId: store.brewLog.recipe.id,
      })
    }
  }

  return (
    <>
      <Header goBack={goBack} />

      <Title
        extraClasses='mt-2'
        title='Edit brew log'
        subtitle='Edit recipe copy'
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
