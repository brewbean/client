import Form from 'components/BrewLog/Form'
// import { useAuth } from 'context/AuthContext'
import { useAlert, alertType } from 'context/AlertContext'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { INSERT_BREW_LOG_ONE } from 'queries'
import { useMutation } from 'urql'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from 'components/Recipe/Schema'
const Create = () => {
  const history = useHistory()
  // const location = useLocation()
  // const { isAuthenticated } = useAuth()
  const { addAlert } = useAlert()

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      stages: [{ action: 'pour', start: 0, end: 0, weight: 0 }],
      serve: 0,
    },
  })

  const [, insertBrewLog] = useMutation(INSERT_BREW_LOG_ONE)

  const submitBrewLog = async (data) => {
    const { stages, serve, rating, title, comment, ...recipe } = data

    const object = {
      comment: comment,
      title: title,
      rating: rating,
      recipe: {
        data: {
          ...recipe,
        },
      },
    }

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

    // const { error } = await insertBrewLog({ object })
    const result = await insertBrewLog({ object })
    const error = result.error
    if (error) {
      addAlert({
        type: alertType.ERROR,
        header: error.message,
        close: true,
      })
    } else {
      history.push(`/recipe`, { createdRecipe: true })
    }
  }
  // if (!location.state || !isAuthenticated) return <Redirect to='/brewlog' />

  return <Form {...methods} onSubmit={methods.handleSubmit(submitBrewLog)} />
}

export default Create
