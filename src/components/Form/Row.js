import { useReducer } from 'react'
import Dropdown from 'components/DropDown'
import InputRow from 'components/InputRow'
import TextArea from 'components/TextArea'

const initState = {
  form: {},
}

const reducer = (state, [type, payload]) => {
  switch (type) {
    case 'setForm':
      return {
        ...state,
        form: {
          ...state.form,
          [payload.key]: payload.value,
        },
      }
    default:
      return state
  }
}

export const Row = ({ config }) => {
  const [{ form }, dispatch] = useReducer(reducer, initState)

  const onChangeGenerator = (attr) => ({ target }) => {
    const { value } = target
    dispatch([
      'setForm',
      {
        key: attr,
        value: value,
      },
    ])
  }

  return (
    <div className='space-y-6 sm:space-y-5'>
      {config.map((c, i) => (
        <div
          key={i}
          className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'
        >
          <div>
            <h4 className='text-md text-gray-900'>{c.rowTitle}</h4>
            <p className='mt-1 max-w-xs text-sm text-gray-500'>
              {c.rowDescription}
            </p>
          </div>
          <div className='mt-4 sm:mt-0 sm:col-span-2 space-y-2'>
            {c.rows.map((r, i) => (
              <div key={i}>
                {r.type === 'input' && (
                  <InputRow
                    id={r.id}
                    value={form[r.name] || ''}
                    onChange={onChangeGenerator(r.name)}
                    placeholder={r.placeholder}
                    label={r.label}
                    {...r.props}
                  />
                )}
                {r.type === 'dropdown' && (
                  <Dropdown id={r.id} options={r.options} {...r.props} />
                )}
                {r.type === 'textarea' && (
                  <TextArea id={r.id} label={r.label} {...r.props} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
