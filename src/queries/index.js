import { gql } from 'urql'
import {
  INSERT_BREW_LOG_ONE,
  GET_ALL_BREW_LOGS,
  GET_SINGLE_BREW_LOG,
  UPDATE_BREW_LOG,
  DELETE_BREW_LOG,
} from './BrewLog'

import {
  GET_ALL_BEANS,
  GET_SINGLE_BEAN,
  GET_SINGLE_BEAN_AND_BEAN_REVIEWS_AVG_BEAN_REVIEW,
  INSERT_BEAN_REVIEW_ONE,
  GET_SINGLE_REVIEW,
  UPDATE_BEAN_REVIEW,
  DELETE_BEAN_REVIEW,
} from './Bean.js'

import {
  fragment,
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
} from './Recipe'

export const GET_BARISTA = gql`
  query {
    barista {
      id
      email
      display_name
      avatar
      created_on
      is_verified
    }
  }
`

export {
  fragment,
  INSERT_BREW_LOG_ONE,
  GET_ALL_BREW_LOGS,
  GET_SINGLE_BREW_LOG,
  UPDATE_BREW_LOG,
  DELETE_BREW_LOG,
  GET_ALL_BEANS,
  GET_SINGLE_BEAN,
  GET_SINGLE_BEAN_AND_BEAN_REVIEWS_AVG_BEAN_REVIEW,
  INSERT_BEAN_REVIEW_ONE,
  GET_SINGLE_REVIEW,
  UPDATE_BEAN_REVIEW,
  DELETE_BEAN_REVIEW,
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
