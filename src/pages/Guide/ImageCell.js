import { Link } from 'react-router-dom'

const LinkWrapper = ({ children, disabled, to }) =>
  disabled ? (
    <div className='space-y-6'>{children}</div>
  ) : (
    <Link to={to} className='space-y-6'>
      {children}
    </Link>
  )

const ImageCell = ({ src, alt, text, disabled, to }) => (
  <LinkWrapper disabled={disabled} to={to}>
    <div className={disabled ? 'relative' : ''}>
      <img
        className='h-40 w-40 rounded-full xl:w-56 xl:h-56 object-cover'
        src={src}
        alt={alt}
      />
      {disabled && (
        <div className='bg-gray-500 opacity-0 hover:opacity-100 rounded-full h-full w-full bg-opacity-90 flex transition duration-500 ease-in-out items-center justify-center absolute top-0'>
          <span className='text-lg font-bold pointer-events-none text-gray-50'>
            COMING SOON
          </span>
        </div>
      )}
    </div>
    <h3 className='text-center text-lg leading-6 font-medium'>{text}</h3>
  </LinkWrapper>
)

export default ImageCell
