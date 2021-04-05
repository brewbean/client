import { Form as BrewLogForm } from 'components/BrewLog/Form'
import Form from 'components/Recipe/Form'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { INSERT_BREW_LOG_ONE, INSERT_RECIPES_ONE } from 'queries'
import { useMutation } from 'urql'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema as brewLogSchema } from 'components/BrewLog/Schema'
import { schema as recipeSchema } from 'components/Recipe/Schema'
// import { useAuth } from 'context/AuthContext'
import { useHistory } from 'react-router-dom'
import Container from 'pages/Recipe/Edit/Container'

const Create = ({ recipe, isImport }) => {
  const history = useHistory()
  const [showBrewLog, setBrewLog] = useState(false)
  const [recipe_id, setRecipeId] = useState(null)
  const [state] = useState({
    recipeSubmitted: false,
  })
  const recipeMethods = useForm({
    resolver: yupResolver(recipeSchema),
    defaultValues: {
      stages: [{ action: 'pour', start: 0, end: 0, weight: 0 }],
      serve: 0,
    },
  })
  const brewLogMethods = useForm({
    resolver: yupResolver(brewLogSchema),
  })
  const [, insertBrewLog] = useMutation(INSERT_BREW_LOG_ONE)

  const submitBrewLog = async (data) => {
    const { stages, serve, rating, title, comment } = data
    const object = {
      comment: comment,
      title: title,
      rating: rating,
      recipe_id: recipe_id,
    }
    if (stages) {
      object.stages = {
        data: [
          ...stages,
          {
            action: 'serve',
            start: serve,
            end: serve,
            weight: stages[stages.length - 1].weight,
          },
        ],
      }
    }
    const { error } = await insertBrewLog({ object })
    if (error?.message.includes('Uniqueness violation')) {
      brewLogMethods.setError('title', {
        message: 'Brew Log title must be unique',
        shouldFocus: true,
      })
    } else {
      history.push(`/brewlog`, { createdBrewLog: true })
    }
  }

  const [, insertRecipe] = useMutation(INSERT_RECIPES_ONE)

  const submitRecipe = async (data) => {
    const { stages, serve, ...recipe } = data
    let object = { ...recipe }

    if (stages) {
      object.stages = {
        data: [
          ...stages,
          {
            action: 'serve',
            start: serve,
            end: serve,
            weight: stages[stages.length - 1].weight,
          },
        ],
      }
    }

    const { data: queryData, error } = await insertRecipe({ object })

    if (error?.message.includes('Uniqueness violation')) {
      recipeMethods.setError('name', {
        message: 'Recipe name must be unique',
        shouldFocus: true,
      })
    } else if (state.recipeSubmitted) {
    } else {
      setBrewLog(true)
      setRecipeId(queryData.insert_recipe_one.id)
    }
  }

  // if (!location.state || !isAuthenticated) return <Redirect to='/brewlog' />
  // NTS: - have to fix the state here
  return (
    <div>
      {showBrewLog ? (
        <BrewLogForm
          {...brewLogMethods}
          // cancelBrewLog={cancelBrewLog}
          onSubmit={brewLogMethods.handleSubmit(submitBrewLog)}
        />
      ) : isImport ? (
        <Container
          recipe={recipe}
          isBrewLog={true}
          setRecipeId={setRecipeId}
          setBrewLog={setBrewLog}
          isNew={true}
        />
      ) : (
        <Form
          {...recipeMethods}
          onSubmit={recipeMethods.handleSubmit(submitRecipe)}
        />
      )}
    </div>
  )
}

export default Create
