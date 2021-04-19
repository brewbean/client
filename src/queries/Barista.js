import { gql } from 'urql'

export const GET_BARISTA = gql`
  query {
    barista {
      id
      email
      display_name
      avatar
      created_on
      is_verified
    }
  }
`
