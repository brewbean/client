// import { useState } from 'react'
import Dropdown from 'components/DropDown'
import InputRow from 'components/InputRow'
import TextArea from 'components/TextArea'

// const initState = {
//   form: {},
// }

// const reducer = (state, [type, payload]) => {
//   switch (type) {
//     case 'setForm':
//       return {
//         ...state,
//         form: {
//           ...state.form,
//           [payload.key]: payload.value,
//         },
//       }
//     default:
//       return state
//   }
// }
const SwitchForm = ({ type, name, id, placeholder, label, props, options }) => {
  console.log('name: ', name)
  switch (type) {
    case 'input':
      return (
        <InputRow
          id={id}
          // value={state.name}
          // onChange={onChangeGenerator(name)}
          placeholder={placeholder}
          label={label}
          {...props}
          // required={required}
        />
      )
    case 'dropdown':
      return <Dropdown id={id} options={options} {...props} />
    case 'textarea':
      return <TextArea id={id} label={label} {...props} />
    default:
      return null
  }
}
export const Row = ({ config }) => {
  // const onChangeGenerator = (attr) => ({ target }) => {
  //   const { value, type } = target
  //   console.log('Value', value)
  //   console.log('Type', type)
  //   console.log('target', target)

  //   setState({
  //     ...state,
  //     [attr]: value,
  //   })
  // }
  console.log('rerendered')
  return (
    <div className='space-y-6 sm:space-y-5'>
      {config.map((c, i) => (
        <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
          <div>
            <h4 className='text-md text-gray-900'>{c.rowTitle}</h4>
            <p className='mt-1 max-w-xs text-sm text-gray-500'>
              {c.rowDescription}
            </p>
          </div>
          <div className='mt-4 sm:mt-0 sm:col-span-2 space-y-2'>
            {c.rows.map((r, i) => (
              <SwitchForm {...r} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
