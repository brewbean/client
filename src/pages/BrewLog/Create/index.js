import Search from 'pages/BrewLog/Create/Search'
import Introduction from './Introduction'
import TemplateForm from './TemplateForm'
import BrewLogForm from './BrewLogForm'
import RecipeImport from './RecipeImport'
import RecipeForm from './RecipeForm'
import FormNavigation from 'components/Form/Navigation'

export const INTRO = 'INTRO'
export const SEARCH = 'SEARCH'
export const TEMPLATE_FORM = 'TEMPLATE_FORM'
export const RECIPE_FORM = 'RECIPE_FORM'
export const RECIPE_IMPORT = 'RECIPE_IMPORT'
export const BREWLOG_FORM = 'BREWLOG_FORM'

const Create = () => (
  <FormNavigation
    defaultPath={INTRO}
    routes={{
      [INTRO]: Introduction,
      [SEARCH]: Search,
      [RECIPE_IMPORT]: RecipeImport,
      [RECIPE_FORM]: RecipeForm,
      [TEMPLATE_FORM]: TemplateForm,
      [BREWLOG_FORM]: BrewLogForm,
    }}
  />
)

export default Create
