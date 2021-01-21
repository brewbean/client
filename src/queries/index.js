import { gql } from 'urql'
/*
  Brew Logs Queries
*/
export const INSERT_BREW_LOGS_ONE = gql`
  mutation($object: brew_logs_insert_input!) {
    insert_brew_logs_one(object: $object) {
      id
      bean_grind
      bean_weight
      brew_type
      rating
      water_temp
      barista_id
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
        img
        name
      }
    }
  }
`
export const UPDATE_BREW_LOGS = gql`
  mutation($id: Int!, $object: brew_logs_set_input) {
    update_brew_logs_by_pk(pk_columns: { id: $id }, _set: $object) {
      comment
      bean_grind
      bean_id
      bean_weight
      brew_type
      rating
      water_amount
      water_temp
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
      name
      id
    }
  }
`
export const GET_SINGLE_BEAN_AND_AVG_BEAN_REVIEW = gql`
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
    bean_reviews_aggregate(where: { bean_id: { _eq: $id } }) {
      aggregate {
        avg {
          rating
        }
      }
    }
  }
`
/*
  Bean Review Queries
*/
export const INSERT_REVIEW_ONE = gql`
  mutation($object: bean_reviews_insert_input!) {
    insert_bean_reviews_one(object: $object) {
      id
      barista_id
      bean_id
      rating
      comment
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
        name
      }
    }
  }
`
export const GET_ALL_REVIEW_OF_BEAN = gql`
  query($_eq: Int!) {
    bean_reviews_aggregate(where: { bean_id: { _eq: $_eq } }) {
      nodes {
        id
        barista_id
        bean_id
        rating
        comment
        barista {
          display_name
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
    }
  }
`
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
export const GET_BARISTA = `
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
/*
  Recipe Queries
*/
export const INSERT_RECIPES_ONE = gql`
  mutation($object: recipes_insert_input!) {
    insert_recipes_one(object: $object) {
      id
      bean_grind
      bean_weight
      brew_type
      rating
      water_temp
      barista_id
    }
  }
`
export const GET_ALL_RECIPES = gql`
  query {
    recipes(order_by: { id: desc }) {
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
      about
      barista {
        id
        display_name
      }
      bean {
        id
        img
        name
      }
    }
  }
`
export const GET_SINGLE_RECIPE_REVIEWS_AVG_REVIEW = gql`
  query($id: Int!) {
    recipes_by_pk(id: $id) {
      id
      brew_type
      bean_weight
      bean_grind
      water_amount
      water_temp
      rating
      comment
      isPrivate
      date_added
      about
      barista {
        id
        display_name
      }
      bean {
        id
        img
        name
      }
    }
    recipe_reviews(where: { recipe_id: { _eq: $id } }) {
      id
      barista_id
      recipe_id
      rating
      comment
      barista {
        id
        display_name
      }
    }
    recipe_reviews_aggregate(where: { recipe_id: { _eq: $id } }) {
      aggregate {
        avg {
          rating
        }
      }
    }
  }
`
export const GET_SINGLE_RECIPE = gql`
  query($id: Int!) {
    recipes_by_pk(id: $id) {
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
        img
        name
      }
    }
  }
`
export const GET_SINGLE_RECIPE_REVIEW = gql`
  query($id: Int!) {
    recipe_reviews_by_pk(id: $id) {
      id
      rating
      comment
      barista {
        id
        display_name
      }
      recipe {
        id
        name
      }
    }
  }
`
/**
 * Recipe & Recipe Player
 */
export const GET_RECIPE_BY_ID = gql`
  query($id: Int!) {
    recipes_by_pk(id: $id) {
      id
      bean_weight
      stages {
        id
        name
        end
        start
        weight
      }
    }
  }
`

export const UPDATE_RECIPES = gql`
  mutation($id: Int!, $object: recipes_set_input) {
    update_recipes_by_pk(pk_columns: { id: $id }, _set: $object) {
      comment
      bean_grind
      bean_id
      bean_weight
      brew_type
      rating
      water_amount
      water_temp
    }
  }
`
export const UPDATE_RECIPE_REVIEW = gql`
  mutation($id: Int!, $object: recipe_reviews_set_input!) {
    update_recipe_reviews_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      comment
      rating
    }
  }
`
export const DELETE_RECIPES = gql`
  mutation($id: Int!) {
    delete_recipes_by_pk(id: $id) {
      id
    }
  }
`
/*
  Recipe Review Queries
*/
export const INSERT_RECIPE_REVIEW_ONE = gql`
  mutation($object: recipe_reviews_insert_input!) {
    insert_recipe_reviews_one(object: $object) {
      id
      barista_id
      recipe_id
      rating
      comment
    }
  }
`
export const DELETE_RECIPE_REVIEW = gql`
  mutation($id: Int!) {
    delete_recipe_reviews_by_pk(id: $id) {
      id
      recipe_id
    }
  }
`
