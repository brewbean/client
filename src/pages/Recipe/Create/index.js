import { useAuth } from 'context/AuthContext'
import Form from 'components/Recipe/Form'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { INSERT_RECIPE } from 'queries/Recipe'
import { useMutation } from 'urql'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from 'components/Recipe/Schema'
import { addServeToStages } from 'helper/recipe'
import { useAlert } from 'context/AlertContext'
import { recipeError } from 'helper/error'

export default function CreateRecipe() {
  const { addAlert } = useAlert()
  const history = useHistory()
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      is_private: true,
      stages: [{ action: 'pour', start: 0, end: 0, weight: 0 }],
      serve: 0,
    },
  })

  const [, insertRecipe] = useMutation(INSERT_RECIPE)

  const submitRecipe = async (data) => {
    const { stages, serve, ...recipe } = data
    let object = { ...recipe }

    if (stages) {
      object.stages = {
        data: addServeToStages(stages, serve),
      }
    }

    const { error } = await insertRecipe({ object })

    if (error) {
      recipeError(addAlert, error, methods.setError)
    } else {
      history.push(`/recipe`, { createdRecipe: true })
    }
  }

  if (!location.state || !isAuthenticated) return <Redirect to='/recipe' />

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
    />
  )
}
