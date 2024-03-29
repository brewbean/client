export const BasicCard = ({ children }) => (
  <div className='bg-white overflow-hidden shadow rounded sm:rounded-lg'>
    <div className='px-4 py-5 sm:p-8'>{children}</div>
  </div>
)

export const InfoCard = ({ children }) => (
  <section>
    <div className='bg-white shadow sm:rounded-lg'>{children}</div>
  </section>
)
