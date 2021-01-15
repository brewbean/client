import { gql } from 'urql'
/*
  Brew Logs Queries
*/
export const INSERT_BREW_LOGS_ONE = gql`
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
      isPrivate
      date_added
      bean {
        id
        img
        name
      }
    }
  }
`
export const GET_ALL_BREW_LOGS = gql`
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
      isPrivate
      date_added
      bean {
        id
        img
        name
      }
    }
  }
`
// TODO: - Update brew_logs_by_pk to brew_log_by_pk
export const GET_SINGLE_BREW_LOG = gql`
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
      isPrivate
      date_added
      bean {
        id
        img
        name
      }
    }
  }
`

export const UPDATE_BREW_LOGS = gql`
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
      isPrivate
      date_added
      bean {
        id
        img
        name
      }
    }
  }
`
export const DELETE_BREW_LOGS = gql`
  mutation($id: Int!) {
    delete_brew_logs_by_pk(id: $id) {
      id
    }
  }
`
/*
  Bean Queries
*/
export const GET_ALL_BEANS = gql`
  query {
    bean(order_by: { id: asc }) {
      id
      company_name
      name
      altitude
      process
      profile_note
      region
      roast_type
      img
      about
      price
      rating
    }
  }
`

export const GET_SINGLE_BEAN = gql`
  query($id: Int!) {
    bean_by_pk(id: $id) {
      id
      company_name
      name
      altitude
      process
      profile_note
      region
      roast_type
      img
      about
      price
      rating
    }
  }
`
export const GET_SINGLE_BEAN_ID_BY_NAME = gql`
  query($_eq: String!) {
    bean(where: { name: { _eq: $_eq } }) {
      id
      name
    }
  }
`

export const GET_SINGLE_BEAN_AND_BEAN_REVIEWS_AVG_BEAN_REVIEW = gql`
  query($id: Int!) {
    bean_by_pk(id: $id) {
      id
      company_name
      name
      altitude
      process
      profile_note
      region
      roast_type
      img
      about
      price
      rating
      bean_reviews {
        id
        rating
        comment
        barista {
          id
          display_name
        }
      }
      bean_reviews_aggregate {
        aggregate {
          avg {
            rating
          }
        }
      }
    }
  }
`
/*
  Review Queries
*/
export const INSERT_REVIEW_ONE = gql`
  mutation($object: bean_reviews_insert_input!) {
    insert_bean_reviews_one(object: $object) {
      id
      barista_id
      bean_id
      rating
      comment
      barista {
        id
        display_name
      }
    }
  }
`

export const GET_SINGLE_REVIEW = gql`
  query($id: Int!) {
    bean_reviews_by_pk(id: $id) {
      id
      barista_id
      bean_id
      rating
      comment
      bean {
        id
        name
      }
    }
  }
`
// Possible not using this
export const GET_ALL_REVIEW_OF_BEAN = gql`
  query($_eq: Int!) {
    bean_reviews(where: { bean: { id: { _eq: $_eq } } }) {
      id
      barista_id
      bean_id
      rating
      comment
      barista {
        id
        display_name
      }
      bean_reviews_aggregate(where: { bean_id: { _eq: $id } }) {
        aggregate {
          avg {
            rating
          }
        }
      }
    }
  }
`

export const UPDATE_BEAN_REVIEW = gql`
  mutation($id: Int!, $object: bean_reviews_set_input!) {
    update_bean_reviews_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      comment
      rating
    }
  }
`
export const DELETE_BEAN_REVIEW = gql`
  mutation($id: Int!) {
    delete_bean_reviews_by_pk(id: $id) {
      id
      bean_id
    }
  }
`
// Possibly not using this
export const GET_AVG_REVIEW_OF_BEAN = gql`
  query($id: Int!) {
    bean_reviews_aggregate(where: { bean_id: { _eq: $id } }) {
      aggregate {
        avg {
          rating
        }
      }
    }
  }
`

export const GET_BARISTA = gql`
  query {
    barista {
      id
      email
      display_name
      avatar
      created_on
    }
  }
`
