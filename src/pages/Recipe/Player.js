import Player from 'components/Player'
import { useQuery } from 'urql'
import { GET_RECIPE_BY_ID } from 'queries'
import { useParams } from 'react-router-dom'
import { Message } from 'components/Message'
import { alertType } from 'context/AlertContext'

const PlayerContainer = () => {
  const { id } = useParams()

  const [{ data, fetching, error }] = useQuery({
    query: GET_RECIPE_BY_ID,
    variables: { id },
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const { stages, bean_weight } = data.recipes_by_pk

  if (stages.length === 0)
    return <Message type={alertType.ERROR}>This recipe is not playable</Message>

  return <Player stages={stages} coffeeWeight={bean_weight} />
}

export default PlayerContainer
