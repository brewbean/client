import {
  GET_SINGLE_BEAN_AND_BEAN_REVIEWS_AVG_BEAN_REVIEW,
  GET_ALL_BREW_LOGS,
  GET_ALL_RECIPES,
  GET_SINGLE_RECIPE_REVIEWS_AVG_REVIEW,
  fragment,
} from 'queries'

export const updates = {
  Mutation: {
    insert_bean_review_one: (result, args, cache, info) => {
      cache.updateQuery(
        {
          query: GET_SINGLE_BEAN_AND_BEAN_REVIEWS_AVG_BEAN_REVIEW,
          variables: { id: args.object.bean_id },
        },
        (data) => {
          data.bean_by_pk.bean_reviews.push(result.insert_bean_review_one)
          return data
        }
      )
    },
    delete_bean_review_by_pk: (result, args, cache, info) => {
      cache.invalidate({ __typename: 'bean_review', id: args.id })
    },
    insert_brew_log_one: (result, args, cache, info) => {
      cache.updateQuery(
        {
          query: GET_ALL_BREW_LOGS,
        },
        (data) => {
          data.brew_log.push(result.insert_brew_log_one)
          return data
        }
      )
    },
    delete_brew_log_by_pk: (result, args, cache, info) => {
      cache.invalidate({ __typename: 'brew_log', id: args.id })
    },
    update_brew_log_by_pk: (result, args, cache, info) => {
      /**
       * [ TO DO ]
       * should implement a `writeFragment` instead of this `updateQuery`
       * lookup if you can construct fragments composing of other fragments
       */
      cache.updateQuery(
        {
          query: GET_ALL_BREW_LOGS,
        },
        (data) => {
          const updateIndex = data.brew_log.findIndex((b) => b.id === args.id)
          return {
            ...data,
            brew_log: [
              ...data.brew_log.slice(0, updateIndex),
              result.update_brew_log_by_pk,
              ...data.brew_log.slice(updateIndex + 1),
            ],
          }
        }
      )
    },
    update_recipe_by_pk: (result, args, cache, info) => {
      /**
       * `writeFragment` is the right function for adding updates since they can be
       * made even if a user hasn't requested a list of entities already
       * ex. edit recipe 34 even though you haven't cached 'get all recipes'
       * (causes null error or bad cache with `updateQuery`)
       */
      cache.writeFragment(fragment.recipeInfo, result.update_recipe_by_pk)
    },
    insert_recipe_one: (result, args, cache, info) => {
      cache.updateQuery(
        {
          query: GET_ALL_RECIPES,
        },
        (data) => {
          // Null error if user navigates to /recipe/new directly
          // Maybe we should avoid directly form navigation or use `writeFragment`
          // `unshift` adds to top of recipe results
          // [NEW BUG] Issue also happens when you log in on clicking 'Create Recipe'
          //  as logging in clears cache
          data.recipe.unshift(result.insert_recipe_one)
          return data
        }
      )
    },
    delete_recipe_by_pk: (result, args, cache, info) => {
      cache.invalidate({ __typename: 'recipe', id: args.id })
    },
    update_recipe_review_by_pk: (result, args, cache, info) => {
      cache.writeFragment(
        fragment.recipeReviewInfo,
        result.update_recipe_review_by_pk
      )
    },
    insert_recipe_review_one: (result, args, cache, info) => {
      cache.updateQuery(
        {
          query: GET_SINGLE_RECIPE_REVIEWS_AVG_REVIEW,
          variables: { id: args.object.recipe_id },
        },
        (data) => {
          data.recipe_by_pk.recipe_reviews.push(
            result.insert_recipe_review_one
          )
          return data
        }
      )
    },
    delete_recipe_review_by_pk: (result, args, cache, info) => {
      cache.invalidate({ __typename: 'recipe_review', id: args.id })
    },
  },
}

export const keys = {
  bean_review_aggregate: () => null,
  bean_review_aggregate_fields: () => null,
  bean_review_avg_fields: () => null,
  recipe_review_aggregate: () => null,
  recipe_review_aggregate_fields: () => null,
  recipe_review_avg_fields: () => null,
}
