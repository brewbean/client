import Form from 'components/BrewLog/Form'
import { useForm } from 'react-hook-form'
import { INSERT_BREW_LOG_ONE } from 'queries'
import { useMutation } from 'urql'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from 'components/BrewLog/Schema'
// import { useAuth } from 'context/AuthContext'
import { useAlert, alertType } from 'context/AlertContext'
import { useHistory } from 'react-router-dom'

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

  // if (!location.state || !isAuthenticated) return <Redirect to='/brewlog' />

  const data = {
    recipe: [
      {
        id: 3,
        about: 'test about',
        barista_id: 6,
        bean_grind: 'extra-coarse',
        bean_id: 2,
        bean_name_free: 'test bean name',
        bean_weight: 25,
        brew_type: 'Pour Over',
        date_added: '2021-01-06T00:00:00+00:00',
        date_updated: '2021-01-31T00:00:00+00:00',
        device: 'chemix',
        instructions: '1. yoyoyoyo',
        is_private: false,
        name: 'Recipe #1',
        water_amount: 300,
        water_temp: 200,
      },
    ],
  }

  return (
    <Form
      {...methods}
      defaultValue={data.recipe[0]}
      onSubmit={methods.handleSubmit(submitBrewLog)}
    />
  )
}

export default Create
