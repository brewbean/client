import { FieldError } from 'components/Form/Error'
import { Input } from 'components/Form/Layout/Stage'
import { combineClass } from 'helper/stringHelper'

const ServeRow = ({ errors, register }) => {
  return (
    <>
      <div className='flex items-center mt-3 pt-3 border-t'>
        <h1 className='mr-2 text-sm font-bold text-gray-700'>Serve Time</h1>
        <Input symbol='sec'>
          <input
            id='serve-time'
            name='serve'
            type='number'
            className={combineClass('input', {
              'input--state-error': errors.serve,
            })}
            ref={register()}
          />
        </Input>
      </div>
      <FieldError error={errors.serve} />
    </>
  )
}

export default ServeRow
