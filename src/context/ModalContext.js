import { useContext, createContext, useState, useCallback } from 'react'

const ModalContext = createContext()

const initState = {
  content: null,
  key: null,
  text: null,
  isVisible: false,
  isPending: false,
  isSuccess: false,
  didExit: false,
}

const ModalProvider = ({ children }) => {
  const [state, setState] = useState(initState)

  // visibility & pending flags only - success/exit context must be handled explicitly
  // open must reset to init state in case this is second try opening
  const open = () => {
    setState({ ...initState, isVisible: true, isPending: true })
  }

  const close = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isVisible: false,
      isPending: false,
    }))
  }, [])

  const exit = useCallback(() => {
    setState((prevState) => ({ ...prevState, didExit: true }))
  }, [])

  const setKey = useCallback((key) => {
    setState((prevState) => ({ ...prevState, key }))
  }, [])

  const success = () => {
    setState((prevState) => ({ ...prevState, isSuccess: true }))
  }

  const setContent = (content, text = null) => {
    setState((prevState) => ({
      ...prevState,
      content,
      text,
    }))
  }

  const setText = (text) => {
    setState((prevState) => ({
      ...prevState,
      text,
    }))
  }

  return (
    <ModalContext.Provider
      value={{
        ...state,
        open,
        close,
        exit,
        success,
        setContent,
        setKey,
        setText,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

const useModal = () => useContext(ModalContext)

export { ModalProvider, useModal }
