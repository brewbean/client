export const resolvers = {
  Query: {
    brew_log_by_pk: (_, args) => ({ __typename: 'brew_log', id: args.id }),
  },
}
