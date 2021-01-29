import { Alert } from 'components/Icon'
import { alertType } from 'context/AlertContext'
import { Success, Fail, Load } from 'components/Utility/AlertAction'

const settings = {
  [alertType.ERROR]: {
    bg: 'bg-red-50',
    icon: Alert.Error,
    header: 'text-red-800',
    message: 'text-red-600',
    action: 'hover:bg-red-100 focus:ring-offset-red-50 focus:ring-red-600',
    close: 'text-red-500 hover:bg-red-200 focus:bg-red-200',
  },
  [alertType.WARNING]: {
    bg: 'bg-yellow-50',
    icon: Alert.Warning,
    header: 'text-yellow-800',
    message: 'text-yellow-600',
    action:
      'hover:bg-yellow-100 focus:ring-offset-yellow-50 focus:ring-yellow-600',
    close: 'text-yellow-500 hover:bg-yellow-200 focus:bg-yellow-200',
  },
  [alertType.SUCCESS]: {
    bg: 'bg-green-50',
    icon: Alert.Success,
    header: 'text-green-800',
    message: 'text-green-600',
    action:
      'hover:bg-green-100 focus:ring-offset-green-50 focus:ring-green-600',
    close: 'text-green-500 hover:bg-green-200 focus:bg-green-200',
  },
  [alertType.INFO]: {
    bg: 'bg-blue-50',
    icon: Alert.Info,
    header: 'text-blue-800',
    message: 'text-blue-600',
    action: 'hover:bg-blue-100 focus:ring-offset-blue-50 focus:ring-blue-600',
    close: 'text-blue-500 hover:bg-blue-200 focus:bg-blue-200',
  },
}

const Notification = ({
  noShadow,
  close,
  onClose,
  type,
  header,
  message,
  action,
  actionOnClick,
  hasSucceeded,
  hasFailed,
  loading,
}) => {
  const Icon = settings[type].icon
  return (
    <div
      className={`rounded-md p-4 ${settings[type].bg} ${
        noShadow ? '' : 'shadow-lg'
      }`.trimEnd()}
    >
      <div className='flex'>
        <div className='flex-shrink-0'>
          <Icon />
        </div>
        <div className='ml-3'>
          <h3
            className={`text-sm leading-5 font-medium ${settings[type].header}`}
          >
            {header}
          </h3>
          {message && (
            <div
              className={`mt-2 text-sm font-normal leading-5 ${settings[type].message}`}
            >
              <p>{message}</p>
            </div>
          )}
          {action && (
            <div className='mt-4'>
              {loading ? (
                <Load />
              ) : hasSucceeded ? (
                <Success
                  message={action.successMessage}
                  colorClass={settings[type].header}
                />
              ) : hasFailed ? (
                <Fail
                  message={action.failMessage}
                  colorClass={settings[type].header}
                />
              ) : (
                <div className='-mx-2 -my-1.5 flex'>
                  <button
                    onClick={actionOnClick}
                    className={`${settings[type].bg} ${settings[type].header} ${settings[type].action} px-2 py-1.5 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2`}
                  >
                    {action.buttonText}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {close && (
          <div className='ml-auto pl-3'>
            <div className='-mx-1.5 -my-1.5'>
              <button
                onClick={onClose}
                className={`inline-flex rounded-md p-1.5 focus:outline-none transition ease-in-out duration-150 ${settings[type].close}`}
                aria-label='Dismiss'
              >
                <Alert.Close />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notification
