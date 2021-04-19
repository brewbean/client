import { useAlert, alertType } from 'context/AlertContext'
import { useHistory, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { UPDATE_BEAN } from 'queries/Bean'
import { useMutation } from 'urql'
import { yupResolver } from '@hookform/resolvers/yup'
import Form from 'components/Bean/Form'
import { schema } from 'components/Bean/Schema'

export default function Container({ bean }) {
  const { addAlert } = useAlert()
  const { id } = useParams()
  const history = useHistory()

  const [, updateBean] = useMutation(UPDATE_BEAN)

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: bean,
  })

  const submitBean = async (bean) => {
    const { error } = await updateBean({
      id,
      bean,
    })

    if (error) {
      if (error.message.includes('Uniqueness violation')) {
        methods.setError('name', {
          message: 'This bean already exist and cannot be readded',
          shouldFocus: true,
        })
      } else {
        addAlert({
          type: alertType.ERROR,
          header: error.message,
          close: true,
        })
      }
    } else {
      history.push(`/bean/${id}`, { edited: true })
    }
  }

  return <Form {...methods} onSubmit={methods.handleSubmit(submitBean)} />
}
