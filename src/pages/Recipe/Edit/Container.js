import Form from 'components/Recipe/Form'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { INSERT_RECIPES_ONE, UPDATE_RECIPE_WITH_STAGES } from 'queries'
import { useMutation } from 'urql'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from 'components/Recipe/Schema'
import { addServeToStages } from 'helper/recipe'

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
  isNew,
  setRecipeId,
  setBrewLog,
}) {
  const { id } = recipe
  const history = useHistory()

  const [, insertRecipe] = useMutation(INSERT_RECIPES_ONE)
  const [, updateRecipe] = useMutation(UPDATE_RECIPE_WITH_STAGES)

  const defaultValues = getDefaultValues(recipe)
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  })

  /**
   * [NOTE]
   * Too much of a mega function for me, this container should be more explicit about what it trying to
   * accomplish. Is it doing routing (ex. isBrewLog, isNew)?
   *
   * Can we break out `submitRecipe` to use helper functions so we can just clearly list out the
   * conditional blocks?
   *
   * All the data prepping can be done into helper functions
   * - Added `addServeToStages` to simplify setting up stages ✅
   *
   * [TODO] move away from an overloaded fn (break up into helper functions)
   *
   */
  const submitRecipe = async ({ stages, serve, ...recipe }) => {
    /**
     * [NOTE] bad code smell ✅
     * JS shouldn't use multiline variable declaration (not python, C, etc)
     * ```
     * let dataResult
     * let error
     * ```
     */
    let data
    let error

    const newStages = stages
      ? addServeToStages(stages, serve).map((s) => ({ ...s, recipe_id: id }))
      : [] // change 'null' to empty array to add no new stages; old stages get deleted regardless

    if (isNew) {
      let object = { ...recipe }

      if (stages) {
        object.stages = {
          data: addServeToStages(stages, serve),
        }
      }

      let insertResult = await insertRecipe({ object })
      data = insertResult.data
      error = insertResult.error
      /**
       * [NOTE] ^ ✅
       * does insert recipe even have to happen inside the code block
       */
    } else {
      let updateResult = await updateRecipe({
        id,
        recipe,
        stages: newStages,
      })
      data = updateResult.data
      error = updateResult.error
    }

    if (error?.message.includes('Uniqueness violation')) {
      methods.setError('name', {
        message: 'Recipe name must be unique',
        shouldFocus: true,
      })
      /**
       * [NOTE] not sure why this is a `else if` they don't seem to be related checks ✅
       *
       * isBrewLog -- decides the next screen based on navigation functions `setRecipeId` (template_id need to be set in future)
       *
       **/
    } else if (isBrewLog) {
      // [NOTE] bad code smell -- ternary should only be used when returning something ✅
      isNew ? setRecipeId(data.insert_recipe_one.id) : setRecipeId(id)
      // if (isNew) {
      //   setRecipeId(dataResult.insert_recipe_one.id)
      // } else {
      //   setRecipeId(id)
      // }
      setBrewLog(true)
    } else {
      history.push(`/recipe/${id}`, { edited: true })
    }
  }

  return (
    <Form
      {...methods}
      onCancel={history.goBack}
      onSubmit={methods.handleSubmit(submitRecipe)}
      header={{
        title: 'Create Recipe',
        subtitle:
          'Follow the form to list out recipe steps. You may also add playable recipe steps to use the recipe player.',
      }}
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
