import { gql } from 'urql'

/**
 * Fragments
 */

export const beanReviewInfo = gql`
  fragment BeanReviewInfo on bean_review {
    id
    rating
    comment
    date_added
    barista {
      id
      display_name
    }
  }
`

export const beanInfo = gql`
  fragment BeanInfo on bean {
    id
    about
    altitude
    company_name
    country_id
    farm_id
    img
    name
    price
    process
    profile_note
    region
    roast_type
    varietal
    date_added
    purchase_info
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
    bean_reviews(order_by: { date_updated: desc }) {
      ...BeanReviewInfo
    }
    ${beanReviewInfo}
  }
`

/*
  Bean Queries
*/
export const INSERT_BEAN = gql`
  mutation InsertBean($object: bean_insert_input!) {
    insert_bean_one(object: $object) {
      ...BeanInfo
    }
  }
  ${beanInfo}
`

export const UPDATE_BEAN = gql`
  mutation UpdateBean($id: Int!, $bean: bean_set_input) {
    update_bean_by_pk(pk_columns: { id: $id }, _set: $bean) {
      ...BeanInfo
    }
  }
  ${beanInfo}
`

export const GET_ALL_BEANS = gql`
  query GetAllBeans($limit: Int, $offset: Int) {
    bean(order_by: { id: desc }, limit: $limit, offset: $offset) {
      ...BeanInfo
    }
    bean_aggregate {
      aggregate {
        count
      }
    }
  }
  ${beanInfo}
`

export const GET_BEAN = gql`
  query GetBean($id: Int!) {
    bean_by_pk(id: $id) {
      ...BeanInfo
    }
  }
  ${beanInfo}
`

/*
  Bean Review Queries
*/
export const INSERT_BEAN_REVIEW = gql`
  mutation InsertBeanReview($object: bean_review_insert_input!) {
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

export const UPDATE_BEAN_REVIEW = gql`
  mutation UpdateBeanReview($id: Int!, $object: bean_review_set_input!) {
    update_bean_review_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      comment
      rating
      date_added
    }
  }
`
export const DELETE_BEAN_REVIEW = gql`
  mutation DeleteBeanReview($id: Int!) {
    delete_bean_review_by_pk(id: $id) {
      id
      bean_id
    }
  }
`
