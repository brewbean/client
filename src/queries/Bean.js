import { gql } from 'urql'
/*
  Bean Queries
*/
export const GET_ALL_BEANS = gql`
  query GetAllBeans($limit: Int, $offset: Int) {
    bean(order_by: { id: asc }, limit: $limit, offset: $offset) {
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
      date_added
      author {
        id
        display_name
      }
      bean_reviews_aggregate {
        aggregate {
          avg {
            rating
          }
        }
      }
    }
    bean_aggregate {
      aggregate {
        count
      }
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
      date_added
      author {
        id
        display_name
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
export const GET_SINGLE_BEAN_AND_BEAN_REVIEWS_AVG_BEAN_REVIEW = gql`
  query BeanAndBeanReviewsById($id: Int!) {
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
      date_added
      author {
        id
        display_name
      }
      bean_reviews(order_by: { date_updated: desc }) {
        id
        rating
        comment
        date_added
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
export const INSERT_BEAN_REVIEW_ONE = gql`
  mutation($object: bean_review_insert_input!) {
    insert_bean_review_one(object: $object) {
      id
      rating
      comment
      date_added
      barista {
        id
        display_name
      }
    }
  }
`
export const GET_SINGLE_REVIEW = gql`
  query($id: Int!) {
    bean_review_by_pk(id: $id) {
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
export const UPDATE_BEAN_REVIEW = gql`
  mutation($id: Int!, $object: bean_review_set_input!) {
    update_bean_review_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      comment
      rating
      date_added
    }
  }
`
export const DELETE_BEAN_REVIEW = gql`
  mutation($id: Int!) {
    delete_bean_review_by_pk(id: $id) {
      id
      bean_id
    }
  }
`
