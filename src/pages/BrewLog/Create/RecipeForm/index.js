import Edit from 'pages/BrewLog/Create/Edit'
import Create from './Create'

export default function RecipeForm(props) {
  return props.store.createdRecipeScratch ? (
    <Edit {...props} />
  ) : (
    <Create {...props} />
  )
}
