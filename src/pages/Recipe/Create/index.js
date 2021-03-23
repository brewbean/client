import { useAuth } from 'context/AuthContext'
import Form from 'components/Recipe/Form'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { INSERT_RECIPES_ONE } from 'queries'
import { useMutation } from 'urql'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from 'components/Recipe/Schema'

export default function CreateRecipe() {
  const history = useHistory()
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      stages: [{ action: 'pour', start: 0, end: 0, weight: 0 }],
      serve: 0,
    },
  })

  const [, insertRecipe] = useMutation(INSERT_RECIPES_ONE)

  const submitRecipe = async (data) => {
    const { stages, serve, ...recipe } = data
    let object = { ...recipe }

    if (stages) {
      object.stages = {
        data: [
          ...stages,
          {
            action: 'serve',
            start: serve,
            end: serve,
            weight: stages[stages.length - 1].weight,
          },
        ],
      }
    }

    const { error } = await insertRecipe({ object })

    if (error?.message.includes('Uniqueness violation')) {
      methods.setError('name', {
        message: 'Recipe name must be unique',
        shouldFocus: true,
      })
    } else {
      history.push(`/recipe`, { createdRecipe: true })
    }
  }

  if (!location.state || !isAuthenticated) return <Redirect to='/recipe' />

  return <Form {...methods} onSubmit={methods.handleSubmit(submitRecipe)} />
}
