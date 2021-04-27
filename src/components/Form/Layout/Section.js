const Section = ({
  title,
  subtitle,
  sectionClass = 'sm:col-span-2',
  children,
}) => (
  <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
    <div>
      <h4 className='text-md text-gray-900'>{title}</h4>
      <p className='mt-1 max-w-xs text-sm text-gray-500'>{subtitle}</p>
    </div>
    <div className={`mt-4 sm:mt-0 space-y-2 ${sectionClass}`.trimEnd()}>
      {children}
    </div>
  </div>
)

export default Section
