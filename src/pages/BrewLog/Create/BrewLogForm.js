import { useMutation } from 'urql'
import { useHistory } from 'react-router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { INSERT_BREW_LOG_ONE } from 'queries'
import { schema } from 'components/BrewLog/Schema'
import { Form, Header, Title } from 'components/BrewLog/Form'
import { setUrqlHeader } from 'helper/header'

export default function BrewLogForm({ goBack, payload, store, setStore }) {
  const history = useHistory()
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: store.brewLog ? store.brewLog : {},
  })

  const [, insertBrewLog] = useMutation(INSERT_BREW_LOG_ONE)

  const submitBrewLog = async (object) => {
    object.recipe_id = payload.recipeId
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

  const goBackWithSave = () => {
    setStore({ ...store, brewLog: methods.getValues() })
    goBack()
  }

  return (
    <>
      <Header goBack={goBackWithSave} />
      <Title
        extraClasses='mb-4 mt-2 sm:mb-0'
        title='Create a brew log'
        subtitle='Add brew log details'
      />
      <Form
        {...methods}
        onCancel={goBackWithSave}
        onSubmit={methods.handleSubmit(submitBrewLog)}
      />
    </>
  )
}
