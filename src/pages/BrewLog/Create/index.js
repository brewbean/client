import { useState } from 'react'
import Search from 'pages/BrewLog/Create/Search'
import Introduction from './Introduction'
import TemplateForm from './TemplateForm'
import BrewlogForm from './BrewlogForm'
import RecipeImport from './RecipeImport'
import RecipeForm from './RecipeForm'

export const INTRO = 'INTRO'
export const SEARCH = 'SEARCH'
export const TEMPLATE_FORM = 'TEMPLATE_FORM'
export const RECIPE_FORM = 'RECIPE_FORM'
export const RECIPE_IMPORT = 'RECIPE_IMPORT'
export const BREWLOG_FORM = 'BREWLOG_FORM'

const map = {
  [INTRO]: Introduction,
  [SEARCH]: Search,
  [RECIPE_IMPORT]: RecipeImport,
  [RECIPE_FORM]: RecipeForm,
  [TEMPLATE_FORM]: TemplateForm,
  [BREWLOG_FORM]: BrewlogForm,
}

export default function Create() {
  const [view, setView] = useState({ path: INTRO, payload: null })
  const [history, setHistory] = useState([{ path: INTRO, payload: null }])

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

  const Component = map[view.path]

  if (!Component) return null
  return <Component payload={view.payload} goTo={goTo} goBack={goBack} />
}
