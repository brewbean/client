// import { useAlert } from 'context/AlertContext'
import Form from 'components/Recipe/Form'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { INSERT_RECIPES_ONE, UPDATE_RECIPE_WITH_STAGES } from 'queries'
import { useMutation } from 'urql'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from 'components/Recipe/Schema'

const getDefaultValues = (recipe) => {
  if (recipe.stages && recipe.stages.length > 0) {
    const length = recipe.stages.length
    return {
      ...recipe,
      stages: recipe.stages
        .slice(0, length - 1)
        .map(({ action, start, end, weight }) => ({
          action,
          start,
          end,
          weight,
        })),
      serve: recipe.stages[length - 1].start,
    }
  } else {
    const { stages, ...rest } = recipe
    return {
      ...rest,
      stages: [{ action: 'pour', start: 0, end: 0, weight: 0 }],
      serve: 0,
    }
  }
}

export default function Container({
  recipe,
  isBrewLog,
  setRecipeId,
  setBrewLog,
  isNew,
}) {
  console.log('Container isBrewLog:', isBrewLog)
  console.log('Container isNew:', isNew)
  // const { addAlert } = useAlert()
  const { id } = recipe
  const history = useHistory()

  const [, insertRecipe] = useMutation(INSERT_RECIPES_ONE)
  const [, updateRecipe] = useMutation(UPDATE_RECIPE_WITH_STAGES)

  const defaultValues = getDefaultValues(recipe)
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })

  const submitRecipe = async (data) => {
    const { stages, serve, ...recipe } = data
    const newStages = stages
      ? [
          ...stages,
          {
            action: 'serve',
            start: serve,
            end: serve,
            weight: stages[stages.length - 1].weight,
          },
        ].map((s) => ({ ...s, recipe_id: id }))
      : [] // change 'null' to empty array to add no new stages; old stages get deleted regardless
    let dataResult, error
    if (isNew) {
      console.log('Container Trying to create new')
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
      ;({ data: dataResult, error } = await insertRecipe({ object }))
      console.log('Container data:', dataResult)
    } else {
      console.log('Container Trying to Update')
      ;({ error } = await updateRecipe({
        id,
        recipe,
        stages: newStages,
      }))
    }
    console.log('Container submitreceipe error', error)
    // if (error) {
    //   addAlert({
    //     type: alertType.ERROR,
    //     header: error.message,
    //     close: true,
    //   })
    if (error?.message.includes('Uniqueness violation')) {
      methods.setError('name', {
        message: 'Recipe name must be unique',
        shouldFocus: true,
      })
    } else if (isBrewLog) {
      isNew ? setRecipeId(dataResult.insert_recipe_one.id) : setRecipeId(id)
      setBrewLog(true)
    } else {
      history.push(`/recipe/${id}`, { edited: true })
    }
  }

  return (
    <Form
      {...methods}
      onSubmit={methods.handleSubmit(submitRecipe)}
      preload={
        defaultValues.serve !== 0 && {
          formMounted: true,
          isHidden: true,
          stages: defaultValues.stages,
          serveTime: defaultValues.serve,
        }
      }
    />
  )
}
