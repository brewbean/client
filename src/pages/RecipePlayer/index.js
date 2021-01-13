import Player from 'components/Player'
import { useQuery } from 'urql'
import { GET_RECIPE_BY_ID } from 'queries'
import { ReactComponent as GifPlaceholder } from './undraw_coffee_break_j3of.svg'

const RecipePlayer = () => {
  const [{ data, fetching, error }] = useQuery({
    query: GET_RECIPE_BY_ID,
    variables: { id: 1 },
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const { stages, bean_weight } = data.recipes_by_pk

  return (
    <Player stages={stages} coffeeWeight={bean_weight} gif={GifPlaceholder} />
  )
}

export default RecipePlayer
