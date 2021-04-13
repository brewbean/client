import { useMutation } from 'urql'
import { useHistory } from 'react-router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { INSERT_BREW_LOG_ONE } from 'queries'
import { schema } from 'components/BrewLog/Schema'
import { Form, Header, Title } from 'components/BrewLog/Form'
import { setUrqlHeader } from 'helper/header'

export default function BrewLogForm({ goBack, payload }) {
  const history = useHistory()
  const methods = useForm({
    resolver: yupResolver(schema),
  })

  const [, insertBrewLog] = useMutation(INSERT_BREW_LOG_ONE)

  const submitBrewLog = async (object) => {
    object.recipe_id = payload.recipe.id
    if (payload.templateRecipeId) {
      object.template_recipe_id = payload.templateRecipeId
    }

    const { data, error } = await insertBrewLog(
      { object },
      setUrqlHeader({ 'x-hasura-role': 'all_barista' })
    )

    if (error?.message.includes('Uniqueness violation')) {
      methods.setError('title', {
        message: 'Brew log title must be unique',
        shouldFocus: true,
      })
    } else {
      history.push(`/brewlog/${data.insert_brew_log_one.id}`, {
        createdBrewLog: true,
        id: data.insert_brew_log_one.id,
      })
    }
  }

  return (
    <>
      <Header goBack={goBack} />
      <Title
        extraClasses='mb-4 mt-2 sm:mb-0'
        title='Create a brew log'
        subtitle={payload.subtitle}
      />
      <Form
        {...methods}
        onCancel={goBack}
        onSubmit={methods.handleSubmit(submitBrewLog)}
      />
    </>
  )
}
