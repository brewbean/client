import { gql } from 'urql'
/*
  Recipe Queries
*/
const INSERT_RECIPES_ONE = gql`
  mutation($object: recipes_insert_input!) {
    insert_recipes_one(object: $object) {
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
      about
      name
      instructions
    }
  }
`
const GET_ALL_RECIPES = gql`
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
      is_private
      date_added
      about
      name
      instructions
      barista {
        id
        display_name
        avatar
      }
      bean {
        id
        img
        name
      }
      recipe_reviews_aggregate {
        aggregate {
          avg {
            rating
          }
        }
      }
    }
  }
`
const GET_SINGLE_RECIPE_REVIEWS_AVG_REVIEW = gql`
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
      is_private
      date_added
      about
      name
      instructions
      barista {
        id
        display_name
      }
      bean {
        id
        img
        name
      }
      recipe_reviews {
        id
        recipe_id
        rating
        comment
        date_added
        barista {
          id
          display_name
          avatar
        }
      }
      recipe_reviews_aggregate {
        aggregate {
          avg {
            rating
          }
        }
      }
    }
  }
`
const GET_SINGLE_RECIPE = gql`
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
      is_private
      date_added
      about
      name
      instructions
      bean {
        img
        name
      }
    }
  }
`
const GET_SINGLE_RECIPE_REVIEW = gql`
  query($id: Int!) {
    recipe_reviews_by_pk(id: $id) {
      id
      rating
      comment
      date_added
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
const GET_RECIPE_BY_ID = gql`
  query($id: Int!) {
    recipes_by_pk(id: $id) {
      id
      bean_weight
      instructions
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
const UPDATE_RECIPES = gql`
  mutation($id: Int!, $object: recipes_set_input) {
    update_recipes_by_pk(pk_columns: { id: $id }, _set: $object) {
      brew_type
      bean_weight
      bean_grind
      water_amount
      water_temp
      rating
      comment
      is_private
      date_added
      about
      name
      instructions
    }
  }
`
const UPDATE_RECIPE_REVIEW = gql`
  mutation($id: Int!, $object: recipe_reviews_set_input!) {
    update_recipe_reviews_by_pk(pk_columns: { id: $id }, _set: $object) {
      id
      comment
      rating
    }
  }
`
const DELETE_RECIPES = gql`
  mutation($id: Int!) {
    delete_recipes_by_pk(id: $id) {
      id
    }
  }
`
/*
  Recipe Review Queries
*/
const INSERT_RECIPE_REVIEW_ONE = gql`
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
const DELETE_RECIPE_REVIEW = gql`
  mutation($id: Int!) {
    delete_recipe_reviews_by_pk(id: $id) {
      id
      recipe_id
    }
  }
`

export {
  INSERT_RECIPES_ONE,
  GET_ALL_RECIPES,
  GET_SINGLE_RECIPE_REVIEWS_AVG_REVIEW,
  GET_SINGLE_RECIPE,
  GET_SINGLE_RECIPE_REVIEW,
  GET_RECIPE_BY_ID,
  UPDATE_RECIPES,
  UPDATE_RECIPE_REVIEW,
  DELETE_RECIPES,
  INSERT_RECIPE_REVIEW_ONE,
  DELETE_RECIPE_REVIEW,
}
