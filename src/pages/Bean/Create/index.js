import { useAuth } from 'context/AuthContext'
import Form from 'components/Bean/Form'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { INSERT_BEAN } from 'queries/Bean'
import { useMutation } from 'urql'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from 'components/Bean/Schema'

export default function CreateBean() {
  const history = useHistory()
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const methods = useForm({
    resolver: yupResolver(schema),
  })

  const [, insertBean] = useMutation(INSERT_BEAN)

  const submitBean = async (object) => {
    const { error } = await insertBean({ object })

    if (error?.message.includes('Uniqueness violation')) {
      methods.setError('name', {
        message: 'This bean already exist and cannot be readded',
        shouldFocus: true,
      })
    } else {
      history.push(`/bean`, { createdBean: true })
    }
  }

  if (!location.state?.fromBean || !isAuthenticated)
    return <Redirect to='/bean' />

  return <Form {...methods} onSubmit={methods.handleSubmit(submitBean)} />
}
