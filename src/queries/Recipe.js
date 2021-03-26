import { gql } from 'urql'

/**
 * Fragments
 */
const recipeInfo = gql`
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
  }
`

const recipeReviewInfo = gql`
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

/*
  Recipe Queries
*/
const INSERT_RECIPES_ONE = gql`
  mutation InsertOneRecipe($object: recipe_insert_input!) {
    insert_recipe_one(object: $object) {
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
    }
  }
`
const GET_ALL_RECIPES = gql`
  query GetAllRecipes($limit: Int, $offset: Int) {
    recipe(order_by: { id: desc }, limit: $limit, offset: $offset) {
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
    }
    recipe_aggregate {
      aggregate {
        count
      }
    }
  }
`
const GET_SINGLE_RECIPE_REVIEWS_AVG_REVIEW = gql`
  query GetOneRecipeWithReviews($id: Int!) {
    recipe_by_pk(id: $id) {
      id
      brew_type
      bean_weight
      bean_grind
      water_amount
      water_temp
      is_private
      date_added
      device
      about
      name
      instructions
      bean_name_free
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
      }
      bean {
        id
        img
        name
      }
      recipe_reviews(order_by: { date_updated: desc }) {
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
  query GetOneRecipe($id: Int!) {
    recipe_by_pk(id: $id) {
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
      stages {
        id
        action
        end
        start
        weight
      }
      bean {
        img
        name
      }
      barista {
        id
        display_name
        avatar
      }
    }
  }
`
const GET_SINGLE_RECIPE_REVIEW = gql`
  query GetOneRecipeReview($id: Int!) {
    recipe_review_by_pk(id: $id) {
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
  query GetRecipeByIdAndStages($id: Int!) {
    recipe_by_pk(id: $id) {
      id
      bean_weight
      instructions
      bean_name_free
      stages {
        id
        action
        end
        start
        weight
      }
    }
  }
`
const UPDATE_RECIPES = gql`
  mutation UpdateRecipe($id: Int!, $object: recipe_set_input) {
    update_recipe_by_pk(pk_columns: { id: $id }, _set: $object) {
      brew_type
      bean_weight
      bean_grind
      water_amount
      water_temp
      is_private
      date_added
      about
      name
      instructions
      bean_name_free
    }
  }
`

const UPDATE_RECIPE_REVIEW = gql`
  mutation UpdateRecipeReview($id: Int!, $object: recipe_review_set_input!) {
    update_recipe_review_by_pk(pk_columns: { id: $id }, _set: $object) {
      ...RecipeReviewInfo
    }
  }
  ${recipeReviewInfo}
`
const DELETE_RECIPES = gql`
  mutation DeleteRecipe($id: Int!) {
    delete_recipe_by_pk(id: $id) {
      id
    }
  }
`
/*
  Recipe Review Queries
*/
const INSERT_RECIPE_REVIEW_ONE = gql`
  mutation InsertRecipeReview($object: recipe_review_insert_input!) {
    insert_recipe_review_one(object: $object) {
      ...RecipeReviewInfo
    }
  }
  ${recipeReviewInfo}
`

const DELETE_RECIPE_REVIEW = gql`
  mutation DeleteRecipeReview($id: Int!) {
    delete_recipe_review_by_pk(id: $id) {
      id
      recipe_id
    }
  }
`

const UPDATE_RECIPE_WITH_STAGES = gql`
  mutation UpdateRecipeWithStages(
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
    }
  }
`

export {
  recipeInfo,
  recipeReviewInfo,
  INSERT_RECIPES_ONE,
  GET_ALL_RECIPES,
  GET_SINGLE_RECIPE_REVIEWS_AVG_REVIEW,
  GET_SINGLE_RECIPE,
  GET_SINGLE_RECIPE_REVIEW,
  GET_RECIPE_BY_ID,
  UPDATE_RECIPES,
  UPDATE_RECIPE_REVIEW,
  UPDATE_RECIPE_WITH_STAGES,
  DELETE_RECIPES,
  INSERT_RECIPE_REVIEW_ONE,
  DELETE_RECIPE_REVIEW,
}
