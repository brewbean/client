import { gql } from 'urql'
import { recipeInfo } from 'queries/Recipe'
/*
  Brew Logs Queries
*/
const baristaInfo = gql`
  fragment BaristaInfo on barista {
    display_name
    id
    avatar
  }
`

const brewLogInfo = gql`
  fragment BrewLogInfo on brew_log {
    id
    comment
    title
    date_created
    is_private
    rating
  }
`
const fragment = {
  baristaInfo,
  recipeInfo,
  brewLogInfo,
}

const INSERT_BREW_LOG_ONE = gql`
  mutation($object: brew_log_insert_input!) {
    insert_brew_log_one(object: $object) {
      id
      comment
      title
      date_created
      is_private
      rating
      barista {
        ...BaristaInfo
      }
      recipe {
        ...RecipeInfo
      }
      template_recipe {
        ...RecipeInfo
      }
    }
  }
  ${fragment.recipeInfo}
  ${fragment.baristaInfo}
`
const GET_ALL_BREW_LOGS = gql`
  query GetAllBrewLogs($limit: Int, $offset: Int) {
    brew_log(order_by: { id: desc }, limit: $limit, offset: $offset) {
      id
      comment
      title
      date_created
      is_private
      rating
      barista {
        ...BaristaInfo
      }
      recipe {
        ...RecipeInfo
      }
      template_recipe {
        ...RecipeInfo
      }
    }
    brew_log_aggregate {
      aggregate {
        count
      }
    }
  }
  ${fragment.recipeInfo}
  ${fragment.baristaInfo}
`
const GET_SINGLE_BREW_LOG = gql`
  query($id: Int!) {
    brew_log_by_pk(id: $id) {
      id
      comment
      title
      date_created
      is_private
      rating
      barista {
        ...BaristaInfo
      }
      recipe {
        ...RecipeInfo
      }
      template_recipe {
        ...RecipeInfo
      }
    }
  }
  ${fragment.recipeInfo}
  ${fragment.baristaInfo}
`
const UPDATE_BREW_LOG = gql`
  mutation($id: Int!, $brew_log: brew_log_set_input) {
    update_brew_log_by_pk(pk_columns: { id: $id }, _set: $brew_log) {
      ...BrewLogInfo
      barista {
        ...BaristaInfo
      }
      recipe {
        ...RecipeInfo
      }
      template_recipe {
        ...RecipeInfo
      }
    }
  }
  ${fragment.recipeInfo}
  ${fragment.baristaInfo}
  ${fragment.brewLogInfo}
`
const DELETE_BREW_LOG = gql`
  mutation($id: Int!) {
    delete_brew_log_by_pk(id: $id) {
      id
    }
  }
`

export {
  brewLogInfo,
  INSERT_BREW_LOG_ONE,
  GET_ALL_BREW_LOGS,
  GET_SINGLE_BREW_LOG,
  UPDATE_BREW_LOG,
  DELETE_BREW_LOG,
}
