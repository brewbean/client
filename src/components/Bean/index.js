import BeanCard from './BeanCard'
import { GET_ALL_BEANS } from 'queries'
import { useQuery } from 'urql'

const Bean = () => {
  const [{ data, fetching, error }] = useQuery({
    query: GET_ALL_BEANS,
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div>
      <div className='bg-gray-800 pb-32'>
        <header className='py-10'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h1 className='text-3xl leading-9 font-bold text-white'>Beans</h1>
          </div>
        </header>
      </div>

      <main className='-mt-32'>
        <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
          {/* <!-- Replace with your content --> */}
          <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {data && data.bean.map((x, i) => <BeanCard key={i} {...x} />)}
          </ul>
          {/* <!-- /End replace --> */}
        </div>
      </main>
    </div>
  )
}
export default Bean
