import { ExclamationCircle } from 'components/Icon';
import { alertType } from 'context/AlertContext';

const Warning = ({ text }) => (
  <div className="flex items-center">
    <ExclamationCircle className='text-yellow-500 h-5 w-5' /><span className='ml-1 text-sm text-gray-700'>{text}</span>
  </div>
)

const FormAlert = ({ type, text }) => {
  switch (type) {
    case alertType.WARNING:
      return <Warning text={text} />
    default:
      return null;
  }
};

export { FormAlert as default, alertType };