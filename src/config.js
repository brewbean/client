export const AUTH_API =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:4000/auth'
    : 'https://api.brewbean.io/auth'

export const VERIFY_API =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:4000/verify'
    : 'https://api.brewbean.io/verify'

export const GRAPHQL_API = 'https://brewbean-graphql.herokuapp.com/v1/graphql'
