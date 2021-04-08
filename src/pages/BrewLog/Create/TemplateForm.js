import { useMutation } from 'urql'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { INSERT_RECIPES_ONE } from 'queries'
import Form from 'components/Recipe/Form'
import { Header, Title } from 'components/BrewLog/Form'
import { schema } from 'components/Recipe/Schema'
import { getDefaultValues } from 'components/Utility/Form'
import { addServeToStages } from 'helper/recipe'
import { BREWLOG_FORM } from 'pages/BrewLog/Create'

export default function TemplateForm({ goBack, goTo, payload }) {
  const [, insertRecipe] = useMutation(INSERT_RECIPES_ONE)
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

    if (error?.message.includes('Uniqueness violation')) {
      methods.setError('name', {
        message: 'Recipe name must be unique',
        shouldFocus: true,
      })
    } else {
      goTo(BREWLOG_FORM, {
        recipe: data.insert_recipe_one,
        templateRecipeId: payload.id,
        subtitle: 'Step 4: Add brew log details',
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
