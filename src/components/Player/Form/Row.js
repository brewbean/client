import { FieldError } from 'components/Form/Error'
import { Input, Row as StageRow } from 'components/Form/Layout/Stage'
import { combineClass } from 'helper/stringHelper'

const Row = ({
  errors,
  action,
  start,
  end,
  weight,
  register,
  clearErrors,
  name,
  index,
  disabledInputs,
  onRemove,
}) => {
  const nameIndex = `${name}[${index}]`
  const error = errors.stages?.[index]
  const errorType = error?.type

  return (
    <>
      <StageRow number={index + 1} onRemove={onRemove}>
        <Input htmlFor={'action-' + index} label='Action'>
          <input
            id={'action-' + index}
            readOnly
            name={nameIndex + '.action'}
            defaultValue={action}
            className='input disabled'
            type='text'
            ref={register()}
          />
        </Input>
        <Input htmlFor={'start-' + index} label='Start Time' symbol='sec'>
          <input
            id={'start-' + index}
            name={nameIndex + '.start'}
            defaultValue={start}
            type='number'
            readOnly={disabledInputs.start}
            className={combineClass('input pr-9', {
              'input--state-error':
                errorType === 'is-row-valid-with-prev-end-time' ||
                errorType === 'is-row-time-valid' ||
                error?.start,
              disabled: disabledInputs.start,
            })}
            onChange={() => {
              if (
                errorType === 'is-row-valid-with-prev-end-time' ||
                errorType === 'is-row-time-valid'
              ) {
                clearErrors('stages')
              }
            }}
            ref={register()}
          />
        </Input>
        <Input htmlFor={'end-' + index} label='End Time' symbol='sec'>
          <input
            id={'end-' + index}
            name={nameIndex + '.end'}
            defaultValue={end}
            type='number'
            readOnly={disabledInputs.end}
            className={combineClass('input pr-9', {
              'input--state-error':
                errorType === 'is-row-time-valid' || error?.end,
              disabled: disabledInputs.end,
            })}
            onChange={() => {
              if (
                errorType === 'is-row-valid-with-prev-end-time' ||
                errorType === 'is-row-time-valid'
              ) {
                clearErrors('stages')
              }
            }}
            ref={register()}
          />
        </Input>
        <Input htmlFor={'weight-' + index} label='Weight' symbol='g'>
          <input
            id={'weight-' + index}
            name={nameIndex + '.weight'}
            defaultValue={weight}
            type='number'
            readOnly={disabledInputs.weight}
            className={combineClass('input pr-6', {
              'input--state-error':
                errorType === 'is-row-valid-with-prev-weight' || error?.weight,
              disabled: disabledInputs.weight,
            })}
            onChange={() => {
              if (errorType === 'is-row-valid-with-prev-weight') {
                clearErrors('stages')
              }
            }}
            ref={register()}
          />
        </Input>
      </StageRow>
      <FieldError
        error={error?.start || error?.end || error?.weight || error}
      />
    </>
  )
}

export default Row
