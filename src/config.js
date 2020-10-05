export const AUTH_API = process.env.NODE_ENV !== 'production'
  ? 'http://localhost:4000/auth'
  : 'https://brewbean-api.herokuapp.com/auth';

export const GRAPHQL_API = 'https://brewbean-graphql.herokuapp.com/v1/graphql';

export const GUEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDA0NjA4MDcuMjM0LCJpc3MiOiJodHRwczovL2JyZXdiZWFuLWFwaS5oZXJva3VhcHAuY29tIiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbImd1ZXN0Il0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6Imd1ZXN0In19.4wCPevoDMZJ7142v7wfCEtRJMvrKaOnOXlbwKwfo6W0'