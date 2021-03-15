export default function Content({ children }) {
  return <div className='my-6'>{children}</div>
}

export const HeaderSection = ({ children }) => (
  <div className='text-lg max-w-prose mx-auto'>{children}</div>
)

export const HeaderBlock = ({ preTitle, title }) => (
  <h1>
    {preTitle && (
      <span className='mb-2 block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase'>
        {preTitle}
      </span>
    )}
    <span className='block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
      {title}
    </span>
  </h1>
)
