import { useState } from 'react'
import { useQuery } from 'urql'
import { GET_ALL_BREW_LOGS } from 'queries'
import BrewLogDetails from './BrewLogDetails'
import SidebarMobile from './SidebarMobile'
import Sidebar from './Sidebar'
import './BrewTrak.css'

const BrewTrak = () => {
  const [id, setId] = useState('')

  const [brewSelected, setBrewSelected] = useState(false)
  const [{ data, fetching, error }] = useQuery({
    query: GET_ALL_BREW_LOGS,
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
    <div className='h-screen flex overflow-hidden bg-white'>
      {/* <!-- Off-canvas menu for mobile --> */}
      <SidebarMobile
        data={data}
        setId={setId}
        setBrewSelected={setBrewSelected}
      />
      {/* <!-- Static sidebar for desktop --> */}
      <div className='hidden md:flex md:flex-shrink-0'>
        <Sidebar data={data} setId={setId} setBrewSelected={setBrewSelected} />
      </div>
      <div className='flex flex-col w-0 flex-1 overflow-hidden'>
        <main
          className='flex-1 overflow-y-auto focus:outline-none'
          tabIndex='0'
        >
          <div className='pt-2 pb-6 md:py-6'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 rounded-lg'>
              <BrewLogDetails
                brewLogId={id}
                brewSelected={brewSelected}
                setBrewSelected={setBrewSelected}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default BrewTrak
