import { gql } from 'urql'
/*
  Brew Logs Queries
*/
const INSERT_BREW_LOGS_ONE = gql`
  mutation($object: brew_logs_insert_input!) {
    insert_brew_logs_one(object: $object) {
      id
      barista_id
      brew_type
      bean_weight
      bean_grind
      water_amount
      bean_id
      water_temp
      rating
      comment
      is_private
      date_added
      bean {
        id
        img
        name
      }
    }
  }
`
const GET_ALL_BREW_LOGS = gql`
  query {
    brew_logs(order_by: { id: desc }) {
      id
      barista_id
      brew_type
      bean_weight
      bean_grind
      water_amount
      bean_id
      water_temp
      rating
      comment
      is_private
      date_added
      bean {
        id
        img
        name
      }
    }
  }
`
const GET_SINGLE_BREW_LOG = gql`
  query($id: Int!) {
    brew_logs_by_pk(id: $id) {
      id
      barista_id
      brew_type
      bean_weight
      bean_grind
      water_amount
      bean_id
      water_temp
      rating
      comment
      is_private
      date_added
      bean {
        id
        img
        name
      }
    }
  }
`
const UPDATE_BREW_LOGS = gql`
  mutation($id: Int!, $object: brew_logs_set_input) {
    update_brew_logs_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      barista_id
      brew_type
      bean_weight
      bean_grind
      water_amount
      bean_id
      water_temp
      rating
      comment
      is_private
      date_added
      bean {
        id
        img
        name
      }
    }
  }
`
const DELETE_BREW_LOGS = gql`
  mutation($id: Int!) {
    delete_brew_logs_by_pk(id: $id) {
      id
    }
  }
`

export {
  INSERT_BREW_LOGS_ONE,
  GET_ALL_BREW_LOGS,
  GET_SINGLE_BREW_LOG,
  UPDATE_BREW_LOGS,
  DELETE_BREW_LOGS,
}
