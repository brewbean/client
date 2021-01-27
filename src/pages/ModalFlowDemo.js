import { useEffect, useState } from 'react'
import { useAuth } from 'context/AuthContext'
import { useModal } from 'context/ModalContext'

function ModalFlowDemo() {
  const { isAuthenticated } = useAuth()
  const { open, setContent, setKey, isSuccess, key } = useModal()
  const [isFormOpen, setFormOpen] = useState(false)

  const showForm = () => {
    if (isAuthenticated) {
      setFormOpen(true)
    } else {
      open()
      setKey('specificForm')
      setContent('login', 'You must be logged in to create a recipe')
    }
  }

  useEffect(() => {
    // means that explicitly the login modal triggered a success response
    // this is because modal can be used by any component thus
    // if this component is still mounted while another component is using
    // a key is needed to discern which should trigger the conditional rendering
    if (isSuccess && key === 'specificForm') {
      setFormOpen(true)
    }
  }, [isSuccess, key])

  return (
    <div>
      {isFormOpen ? (
        <div>form open</div>
      ) : (
        <button onClick={showForm} className='rounded bg-blue-400 px-4 py-2'>
          Show Form
        </button>
      )}
    </div>
  )
}

export default ModalFlowDemo
