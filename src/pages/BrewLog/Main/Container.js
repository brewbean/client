import Sidebar from 'components/BrewLog/Sidebar'
import { Header } from 'components/Layout'
import Footer from 'components/Layout/Footer'
import { useQueryParams } from 'components/Utility/Hook'
import { BasicPagination } from 'components/Utility/List'

export default function Container({ fetching, error, data }) {
  const { page } = useQueryParams()
  const currPage = page ? parseInt(page) : 1
  const offset = (currPage - 1) * 10
  return (
    <div className='bg-gray-100'>
      <div className='max-w-5xl mx-auto h-screen overflow-hidden flex flex-col'>
        <Header />

        {/* Content area */}
        <div className='min-h-0 flex-1 flex overflow-hidden'>
          <main className='min-w-0 flex-1 flex space-x-4'>
            {/* brew log list*/}
            <aside className='flex-shrink-0'>
              <div className='h-full flex flex-col w-80 bg-gray-50 rounded-lg'>
                <div className='flex-shrink-0 h-16 px-6 flex flex-col justify-center border-b border-gray-200'>
                  <h2 className='text-lg leading-6 font-medium text-gray-900'>
                    Brew logs
                  </h2>
                </div>

                <nav className='min-h-0 flex-1 overflow-y-auto'>
                  <Sidebar
                    loading={fetching}
                    error={error}
                    logs={data?.brew_log}
                  />
                </nav>

                {/* Pagination controls */}
                <div className='flex-shrink-0 h-16 px-6 flex flex-col justify-center border-t border-gray-200'>
                  <BasicPagination
                    start={1 + offset}
                    end={data?.brew_log.length + offset}
                    total={data?.brew_log_aggregate?.aggregate?.count}
                  />
                </div>
              </div>
            </aside>

            {/* Detail area */}
            <section className='min-w-0 flex-1 h-full flex flex-col overflow-hidden bg-white rounded-lg'>
              <div className='min-h-0 flex-1 overflow-y-auto'>
                <div className='p-4'>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Animi, voluptas numquam? Obcaecati, eveniet delectus tenetur
                    ea dolorum repudiandae accusamus explicabo debitis nisi
                    officiis doloribus perferendis quisquam dolor alias animi
                    magni! Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Animi, voluptas numquam? Obcaecati, eveniet delectus
                    tenetur ea dolorum repudiandae accusamus explicabo debitis
                    nisi officiis doloribus perferendis quisquam dolor alias
                    animi magni! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Animi, voluptas numquam? Obcaecati,
                    eveniet delectus tenetur ea dolorum repudiandae accusamus
                    explicabo debitis nisi officiis doloribus perferendis
                    quisquam dolor alias animi magni! Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Animi, voluptas numquam?
                    Obcaecati, eveniet delectus tenetur ea dolorum repudiandae
                    accusamus explicabo debitis nisi officiis doloribus
                    perferendis quisquam dolor alias animi magni! Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Animi, voluptas
                    numquam? Obcaecati, eveniet delectus tenetur ea dolorum
                    repudiandae accusamus explicabo debitis nisi officiis
                    doloribus perferendis quisquam dolor alias animi magni!
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Animi, voluptas numquam? Obcaecati, eveniet delectus tenetur
                    ea dolorum repudiandae accusamus explicabo debitis nisi
                    officiis doloribus perferendis quisquam dolor alias animi
                    magni! Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Animi, voluptas numquam? Obcaecati, eveniet delectus
                    tenetur ea dolorum repudiandae accusamus explicabo debitis
                    nisi officiis doloribus perferendis quisquam dolor alias
                    animi magni! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Animi, voluptas numquam? Obcaecati,
                    eveniet delectus tenetur ea dolorum repudiandae accusamus
                    explicabo debitis nisi officiis doloribus perferendis
                    quisquam dolor alias animi magni! Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Animi, voluptas numquam?
                    Obcaecati, eveniet delectus tenetur ea dolorum repudiandae
                    accusamus explicabo debitis nisi officiis doloribus
                    perferendis quisquam dolor alias animi magni! Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Animi, voluptas
                    numquam? Obcaecati, eveniet delectus tenetur ea dolorum
                    repudiandae accusamus explicabo debitis nisi officiis
                    doloribus perferendis quisquam dolor alias animi magni!
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  )
}
