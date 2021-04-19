import { gql } from 'urql'
import { recipeInfo } from 'queries/Recipe'
/*
  Brew Logs Queries
*/

export const brewLogInfo = gql`
  fragment BrewLogInfo on brew_log {
    id
    comment
    title
    date_created
    is_private
    rating
    barista {
      id
      display_name
      avatar
    }
    recipe {
      ...RecipeInfo
    }
    template_recipe {
      ...RecipeInfo
    }
  }
  ${recipeInfo}
`

export const INSERT_BREW_LOG = gql`
  mutation InsertBrewLog($object: brew_log_insert_input!) {
    insert_brew_log_one(object: $object) {
      ...BrewLogInfo
    }
  }
  ${brewLogInfo}
`
export const GET_ALL_BREW_LOGS = gql`
  query GetAllBrewLogs($limit: Int, $offset: Int) {
    brew_log(order_by: { id: desc }, limit: $limit, offset: $offset) {
      ...BrewLogInfo
    }
    brew_log_aggregate {
      aggregate {
        count
      }
    }
  }
  ${brewLogInfo}
`
export const GET_BREW_LOG = gql`
  query GetBrewLog($id: Int!) {
    brew_log_by_pk(id: $id) {
      ...BrewLogInfo
    }
  }
  ${brewLogInfo}
`
export const UPDATE_BREW_LOG = gql`
  mutation UpdateBrewLog($id: Int!, $brew_log: brew_log_set_input) {
    update_brew_log_by_pk(pk_columns: { id: $id }, _set: $brew_log) {
      ...BrewLogInfo
    }
  }
  ${brewLogInfo}
`
export const DELETE_BREW_LOG = gql`
  mutation DeleteBrewLog($id: Int!) {
    delete_brew_log_by_pk(id: $id) {
      id
    }
  }
`
