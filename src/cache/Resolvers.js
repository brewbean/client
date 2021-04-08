export const resolvers = {
  Query: {
    brew_log_by_pk: (_, args) => ({ __typename: 'brew_log', id: args.id }),
    recipe_by_pk: (_, args) => ({ __typename: 'recipe', id: args.id }),
    bean_by_pk: (_, args) => ({ __typename: 'bean', id: args.id }),
  },
}
