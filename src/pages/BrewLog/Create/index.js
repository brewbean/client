import { Form as BrewLogForm } from 'components/BrewLog/Form'
import Form from 'components/Recipe/Form'

import { useForm } from 'react-hook-form'
import { INSERT_BREW_LOG_ONE, INSERT_RECIPES_ONE } from 'queries'
import { useMutation } from 'urql'
import { yupResolver } from '@hookform/resolvers/yup'
// import { schema } from 'components/BrewLog/Schema'
import { schema } from 'components/Recipe/Schema'

// import { useAuth } from 'context/AuthContext'
import { useAlert, alertType } from 'context/AlertContext'
import { useHistory } from 'react-router-dom'

const Create = ({ defaultValue }) => {
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
    const { error } = await insertBrewLog({ object })
    if (error) {
      addAlert({
        type: alertType.ERROR,
        header: error.message,
        close: true,
      })
    } else {
      history.push(`/brewlog`, { createdBrewLog: true })
    }
  }

  const [, insertRecipe] = useMutation(INSERT_RECIPES_ONE)

  const submitRecipe = async (data) => {
    console.log('Brew Log Create: ', data)
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

  // if (!location.state || !isAuthenticated) return <Redirect to='/brewlog' />

  return (
    <>
      <BrewLogForm
        {...methods}
        onSubmit={methods.handleSubmit(submitBrewLog)}
      />
      <Form
        {...methods}
        defaultValue={defaultValue}
        onSubmit={methods.handleSubmit(submitRecipe)}
        preload={
          defaultValue &&
          defaultValue?.stages !== 0 && {
            formMount: true,
            isHidden: true,
            stages: defaultValue.stages,
            serveTime: defaultValue.serve,
          }
        }
      />
    </>
  )
}

export default Create
