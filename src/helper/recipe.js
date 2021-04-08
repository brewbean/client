export const addServeToStages = (stages, serveTime) => [
  ...stages,
  {
    action: 'serve',
    start: serveTime,
    end: serveTime,
    weight: stages[stages.length - 1].weight,
  },
]
