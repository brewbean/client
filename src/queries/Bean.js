import { gql } from 'urql'
/*
  Bean Queries
*/
const GET_ALL_BEANS = gql`
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
const GET_SINGLE_BEAN = gql`
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
const GET_SINGLE_BEAN_AND_BEAN_REVIEWS_AVG_BEAN_REVIEW = gql`
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
  Bean Review Queries
*/
const INSERT_REVIEW_ONE = gql`
  mutation($object: bean_reviews_insert_input!) {
    insert_bean_reviews_one(object: $object) {
      id
      rating
      comment
      barista {
        id
        display_name
      }
    }
  }
`
const GET_SINGLE_REVIEW = gql`
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
const UPDATE_BEAN_REVIEW = gql`
  mutation($id: Int!, $object: bean_reviews_set_input!) {
    update_bean_reviews_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      comment
      rating
    }
  }
`
const DELETE_BEAN_REVIEW = gql`
  mutation($id: Int!) {
    delete_bean_reviews_by_pk(id: $id) {
      id
      bean_id
    }
  }
`

export {
  GET_ALL_BEANS,
  GET_SINGLE_BEAN,
  GET_SINGLE_BEAN_AND_BEAN_REVIEWS_AVG_BEAN_REVIEW,
  INSERT_REVIEW_ONE,
  GET_SINGLE_REVIEW,
  UPDATE_BEAN_REVIEW,
  DELETE_BEAN_REVIEW,
}
