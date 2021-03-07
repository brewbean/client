import { useReducer } from 'react'
import Dropdown from 'components/DropDown'
import InputRow from 'components/InputRow'
import TextArea from 'components/TextArea'
import { Link } from 'react-router-dom'
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
                {r.rowType === 'input' && (
                  <InputRow
                    value={form[r.value] || ''}
                    onChange={onChangeGenerator(r.value)}
                    {...r.props}
                  />
                )}
                {r.rowType === 'dropdown' && (
                  <Dropdown
                    value={form[r.value] || ''}
                    onChange={onChangeGenerator(r.value)}
                    {...r.props}
                  />
                )}
                {r.rowType === 'textarea' && (
                  <TextArea id={r.id} label={r.label} {...r.props} />
                )}
              </div>
            ))}
          </div>
          {/* Button row */}
        </div>
      ))}
      <div className='flex justify-end'>
        <Link
          to='/recipe'
          className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Cancel
        </Link>
        <button
          // disabled={saveDisabled}
          type='submit'
          //${!saveDisabled ? 'hover:bg-blue-700' : 'cursor-not-allowed'}`
          className={`disabled:opacity-50 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          Save
        </button>
      </div>
    </div>
  )
}
