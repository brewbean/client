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
  hasModalAlert: true,
}

const ModalProvider = ({ children }) => {
  const [state, setState] = useState(initState)

  // visibility & pending flags only - success/exit context must be handled explicitly
  // open must reset to init state in case this is second try opening
  const open = useCallback(() => {
    setState({
      ...initState,
      isVisible: true,
      isPending: true,
    })
  }, [])

  const reset = useCallback(() => {
    setState(initState)
  }, [])

  const close = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      isVisible: false,
      isPending: false,
      hasModalAlert: true,
    }))
  }, [])

  const exit = useCallback(() => {
    setState((prevState) => ({ ...prevState, didExit: true }))
  }, [])

  const setKey = useCallback((key) => {
    setState((prevState) => ({ ...prevState, key }))
  }, [])

  const setModalAlert = useCallback((hasModalAlert) => {
    setState((prevState) => ({ ...prevState, hasModalAlert }))
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
        reset,
        success,
        setContent,
        setKey,
        setText,
        setModalAlert,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

const useModal = () => useContext(ModalContext)

export { ModalProvider, useModal }
