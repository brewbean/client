import { useAuth } from 'context/AuthContext'
import { useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { GET_SINGLE_BREW_LOG } from 'queries'
import { useQuery } from 'urql'
import Container from 'pages/Recipe/Edit/Container'
import BrewLogContainer from 'pages/BrewLog/Edit/Container'

const EditBrewLog = () => {
  const { id } = useParams()
  const { isVerified, barista } = useAuth()
  // const [showBrewLog, setShowBrewLog] = useStateE
  const [showBrewLog, setBrewLog] = useState(false)
  const [, setRecipeId] = useState(null)

  const [{ data, fetching, error }] = useQuery({
    query: GET_SINGLE_BREW_LOG,
    variables: { id },
  })

  if (fetching) return <p>Loading...</p>
  if (error) return <p>Oh no... error: {error.message}</p>
  if (!data?.brew_log_by_pk) return null

  // needs to be last or else it will always redirect because query is slower
  if (!isVerified || data?.brew_log_by_pk.barista.id !== barista?.id)
    return <Redirect to={`/brewlog`} />

  return (
    <>
      {showBrewLog ? (
        <BrewLogContainer brew_log={data.brew_log_by_pk} />
      ) : (
        <Container
          recipe={data.brew_log_by_pk.recipe}
          isBrewLog={true}
          setRecipeId={setRecipeId} // unsure if this is needed but is here to break code
          setBrewLog={setBrewLog}
          isNew={false}
        />
      )}
    </>
  )
}

export default EditBrewLog
