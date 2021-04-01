import { gql } from 'urql'
/*
  Brew Logs Queries
*/
const baristaInfo = gql`
  fragment baristaFragment on barista {
    display_name
    created_on
    email
    id
    is_verified
    avatar
  }
`
const recipeInfo = gql`
  fragment recipeFragment on recipe {
    about
    bean_grind
    bean_id
    bean_name_free
    bean_weight
    brew_type
    date_added
    date_updated
    device
    id
    instructions
    is_private
    name
    water_amount
    water_temp
    barista {
      id
      display_name
      avatar
    }
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
        ...baristaFragment
      }
      recipe {
        ...recipeFragment
      }
      template_recipe {
        ...recipeFragment
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
        ...baristaFragment
      }
      recipe {
        ...recipeFragment
      }
      template_recipe {
        ...recipeFragment
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
        ...baristaFragment
      }
      recipe {
        ...recipeFragment
      }
      template_recipe {
        ...recipeFragment
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
        ...baristaFragment
      }
      recipe {
        ...recipeFragment
      }
      template_recipe {
        ...recipeFragment
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
