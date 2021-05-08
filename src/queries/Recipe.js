import { gql } from 'urql'

/**
 * Fragments
 */
export const recipeReviewInfo = gql`
  fragment RecipeReviewInfo on recipe_review {
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
`

export const recipeInfo = gql`
  fragment RecipeInfo on recipe {
    id
    barista_id
    brew_type
    bean_weight
    bean_grind
    water_amount
    bean_id
    water_temp
    is_private
    date_added
    device
    about
    name
    instructions
    bean_name_free
    is_deleted
    stages {
      id
      action
      end
      start
      weight
    }
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
    recipe_reviews(order_by: { date_updated: desc }) {
      ...RecipeReviewInfo
    }
  }
  ${recipeReviewInfo}
`

/*
  Recipe Queries
*/
export const INSERT_RECIPE = gql`
  mutation InsertRecipe($object: recipe_insert_input!) {
    insert_recipe_one(object: $object) {
      ...RecipeInfo
    }
  }
  ${recipeInfo}
`
export const GET_ALL_RECIPES = gql`
  query GetAllRecipes(
    $limit: Int
    $offset: Int
    $query: String
    $orderBy: [recipe_order_by!]
  ) {
    recipe(
      order_by: $orderBy
      limit: $limit
      offset: $offset
      where: {
        is_deleted: { _eq: false }
        _or: [
          { name: { _ilike: $query } }
          { barista: { display_name: { _ilike: $query } } }
          { brew_type: { _ilike: $query } }
        ]
      }
    ) {
      ...RecipeInfo
    }
    recipe_aggregate(
      where: {
        is_deleted: { _eq: false }
        _or: [
          { name: { _ilike: $query } }
          { barista: { display_name: { _ilike: $query } } }
          { brew_type: { _ilike: $query } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
  ${recipeInfo}
`

export const GET_RECIPE = gql`
  query GetRecipe($id: Int!) {
    recipe_by_pk(id: $id) {
      ...RecipeInfo
    }
  }
  ${recipeInfo}
`

export const UPDATE_RECIPE_REVIEW = gql`
  mutation UpdateRecipeReview($id: Int!, $object: recipe_review_set_input!) {
    update_recipe_review_by_pk(pk_columns: { id: $id }, _set: $object) {
      ...RecipeReviewInfo
    }
  }
  ${recipeReviewInfo}
`
export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: Int!, $name: String!) {
    update_recipe_by_pk(
      pk_columns: { id: $id }
      _set: { name: $name, is_deleted: true }
    ) {
      ...RecipeInfo
    }
  }
  ${recipeInfo}
`
/*
  Recipe Review Queries
*/
export const INSERT_RECIPE_REVIEW = gql`
  mutation InsertRecipeReview($object: recipe_review_insert_input!) {
    insert_recipe_review_one(object: $object) {
      ...RecipeReviewInfo
    }
  }
  ${recipeReviewInfo}
`

export const DELETE_RECIPE_REVIEW = gql`
  mutation DeleteRecipeReview($id: Int!) {
    delete_recipe_review_by_pk(id: $id) {
      id
      recipe_id
    }
  }
`

export const UPDATE_RECIPE = gql`
  mutation UpdateRecipe(
    $id: Int!
    $recipe: recipe_set_input
    $stages: [stage_insert_input!]!
  ) {
    delete_stage(where: { recipe_id: { _eq: $id } }) {
      affected_rows
      returning {
        id
      }
    }
    insert_stage(objects: $stages) {
      returning {
        id
        action
        start
        end
        weight
      }
    }
    update_recipe_by_pk(pk_columns: { id: $id }, _set: $recipe) {
      ...RecipeInfo
    }
  }
  ${recipeInfo}
`
