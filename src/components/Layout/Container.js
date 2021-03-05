import Header from './Header'
import Footer from './Footer'
import { Modal } from 'components/Modal'

const Container = ({ children }) => {
  return (
    <div className='bg-gray-100 flex flex-col'>
      <div className='w-full flex flex-col min-h-screen max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Header />
        <div className='flex-1'>{children}</div>
        <Footer />
      </div>
      <Modal />
    </div>
  )
}

export default Container
