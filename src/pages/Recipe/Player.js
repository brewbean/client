import Player from 'components/Player'
import { useQuery } from 'urql'
import { GET_RECIPE } from 'queries/Recipe'
import { useParams } from 'react-router-dom'
import { Message } from 'components/Message'
import { alertType } from 'context/AlertContext'

const PlayerContainer = () => {
  const { id } = useParams()

  const [{ data, fetching, error }] = useQuery({
    query: GET_RECIPE,
    variables: { id },
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  const { stages, bean_weight } = data.recipe_by_pk

  if (stages.length === 0)
    return <Message type={alertType.ERROR}>This recipe is not playable</Message>

  const serve = stages.find(({ action }) => action === 'serve')

  return (
    <Player
      stages={[
        ...stages
          .filter((s) => s.action !== 'serve')
          .sort((a, b) => a.start - b.start),
        serve,
      ]}
      coffeeWeight={bean_weight}
    />
  )
}

export default PlayerContainer
