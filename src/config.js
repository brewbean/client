export const AUTH_API = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:4000/auth'
  : 'https://brewbean-api.herokuapp.com/auth';

export const GRAPHQL_API = 'https://brewbean-graphql.herokuapp.com/v1/graphql';