const Title = ({ extraClasses, title, subtitle }) => (
  <div
    className={('pb-4 border-b-2 border-gray-200 ' + extraClasses).trimEnd()}
  >
    <h1 className='text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl'>
      {title}
    </h1>
    {subtitle && <h2 className='mt-2 text-xl text-gray-500'>{subtitle}</h2>}
  </div>
)

export default Title
