export const addServeToStages = (stages, serveTime) => [
  ...stages,
  {
    action: 'serve',
    start: serveTime,
    end: serveTime,
    weight: stages[stages.length - 1].weight,
  },
]

export const normalizeStages = (stages, serve, recipeId) =>
  stages
    ? addServeToStages(stages, serve).map((s) => ({
        ...s,
        recipe_id: recipeId,
      }))
    : [] // change 'null' to empty array to add no new stages; old stages get deleted regardless
