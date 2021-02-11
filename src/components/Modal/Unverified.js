const Unverified = () => (
  <div>
    <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100'>
      {/* <!-- Heroicon name: solid/hand --> */}
      <svg
        className='w-6 h-6 text-red-600'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z'
          clipRule='evenodd'
        />
      </svg>
    </div>
    <div className='mt-3 text-center sm:mt-5'>
      <h3 className='text-lg leading-6 font-medium text-gray-900'>
        Sorry! You're unverified!
      </h3>
      <div className='mt-2'>
        <p className='text-sm text-gray-500'>
          You must verify your account before you can use this feature. Please
          look for your verification email.
        </p>
      </div>
    </div>
  </div>
)

export default Unverified
