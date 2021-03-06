import InputRow from 'components/InputRow'

export const Row = ({ config }) => {
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
              <InputRow
                id={r.id}
                // value={form.name}
                // onChange={onChangeGenerator('name')}
                placeholder={r.placeholder}
                label={r.label}
                required
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
