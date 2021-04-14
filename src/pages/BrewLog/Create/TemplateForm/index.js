import Edit from 'pages/BrewLog/Create/Edit'
import Create from './Create'

export default function TemplateForm(props) {
  return props.store.createdTemplateRecipe ? (
    <Edit {...props} />
  ) : (
    <Create {...props} />
  )
}
