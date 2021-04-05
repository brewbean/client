import { useAlert, alertType } from 'context/AlertContext'
import { useParams, useHistory } from 'react-router-dom'
import { Form as BrewLogForm } from 'components/BrewLog/Form'
import { UPDATE_BREW_LOG } from 'queries'
import { useMutation } from 'urql'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { schema } from 'components/BrewLog/Schema'

const EditBrewLogContainer = ({ brew_log }) => {
  const { addAlert } = useAlert()
  const { id } = useParams()
  const history = useHistory()

  const [, updateBrewLog] = useMutation(UPDATE_BREW_LOG)

  const methods = useForm({
    resolver: yupResolver(schema),
    // need to add default value here...maybe have to update the other default value
    defaultValues: brew_log,
  })

  const submitBrewLog = async (data) => {
    const { error } = await updateBrewLog({
      id,
      brew_log: data,
    })
    if (error) {
      addAlert({
        type: alertType.ERROR,
        header: error.message,
        close: true,
      })
    } else {
      history.push(`/brewlog`, { edited: true })
    }
  }
  return (
    <div>
      <BrewLogForm
        {...methods}
        onSubmit={methods.handleSubmit(submitBrewLog)}
      />
    </div>
  )
}

export default EditBrewLogContainer
