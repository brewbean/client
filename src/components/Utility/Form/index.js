/**
 * normalize recipe.stages for form usage
 */
export const getDefaultValues = (recipe, override = []) => {
  let result
  if (recipe.stages && recipe.stages.length > 0) {
    const length = recipe.stages.length
    result = {
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
    result = {
      ...rest,
      stages: [{ action: 'pour', start: 0, end: 0, weight: 0 }],
      serve: 0,
    }
  }
  override.forEach(({ key, value }) => {
    result[key] = value
  })
  return result
}
