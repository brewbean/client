import { useMutation } from 'urql'
import { useHistory } from 'react-router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { INSERT_BREW_LOG_ONE } from 'queries'
import { schema } from 'components/BrewLog/Schema'
import { Form, Header, Title } from 'components/BrewLog/Form'

export default function BrewlogForm({ goBack, payload }) {
  const history = useHistory()
  const methods = useForm({
    resolver: yupResolver(schema),
  })

  const [, insertBrewlog] = useMutation(INSERT_BREW_LOG_ONE)

  const submitBrewlog = async (object) => {
    object.recipe_id = payload.recipe.id
    if (payload.templateRecipeId) {
      object.template_recipe_id = payload.templateRecipeId
    }

    const { data, error } = await insertBrewlog({ object })

    if (error?.message.includes('Uniqueness violation')) {
      methods.setError('title', {
        message: 'Brew log title must be unique',
        shouldFocus: true,
      })
    } else {
      history.push(`/brewlog/${data.insert_brew_log_one.id}`)
    }
  }

  return (
    <>
      <Header goBack={goBack} />
      <Title
        extraClasses='mt-2'
        title='Create a brew log'
        subtitle={payload.subtitle}
      />
      <Form
        {...methods}
        onCancel={goBack}
        onSubmit={methods.handleSubmit(submitBrewlog)}
      />
    </>
  )
}
