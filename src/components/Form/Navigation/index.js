import { useState } from 'react'

export default function FormNavigation({
  routes,
  defaultPath,
  defaultPayload = null,
  initialStore = null,
}) {
  const [store, setStore] = useState(initialStore)
  const [view, setView] = useState({
    path: defaultPath,
    payload: defaultPayload,
  })
  const [history, setHistory] = useState([
    { path: defaultPath, payload: defaultPayload },
  ])

  const goTo = (path, payload = null) => {
    setView({ path, payload })
    setHistory([...history, { path, payload }])
  }

  const goBack = () => {
    let newHistory = [...history]
    newHistory.pop()
    if (newHistory.length > 0) {
      setView(newHistory[newHistory.length - 1])
      setHistory(newHistory)
    }
  }

  const Component = routes[view.path]

  if (!Component) return null
  return (
    <Component
      payload={view.payload}
      goTo={goTo}
      goBack={goBack}
      store={store}
      setStore={setStore}
    />
  )
}
