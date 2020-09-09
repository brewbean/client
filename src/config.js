export const AUTH_API = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:4000'
  : 'https://brewbean-api.herokuapp.com';

export const GRAPHQL_API = 'https://brewbean-graphql.herokuapp.com/v1/graphql';

export const GUEST_TOKEN = ''