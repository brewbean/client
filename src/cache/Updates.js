import {
  GET_SINGLE_BEAN_AND_BEAN_REVIEWS_AVG_BEAN_REVIEW,
  GET_ALL_BREW_LOGS,
  GET_ALL_RECIPES,
  GET_ALL_BEANS,
  GET_SINGLE_RECIPE_REVIEWS_AVG_REVIEW,
  fragment,
} from 'queries'

export const updates = {
  Mutation: {
    insert_bean_one: (result, args, cache, info) => {
      const key = 'Query'
      cache
        .inspectFields(key)
        .filter((field) => field.fieldName === 'bean')
        .forEach((field) => {
          if (field.arguments.offset !== 0) {
            cache.invalidate(key, field.fieldKey)
          }
        })

      cache.updateQuery(
        {
          query: GET_ALL_BEANS,
          variables: {
            limit: 10,
            offset: 0,
          },
        },
        (data) => {
          if (data) {
            data.bean.unshift(result.insert_bean_one)
            if (data.bean.length > 10) {
              data.bean.pop()
            }
            data.bean_aggregate.aggregate.count++
          }
          return data
        }
      )
    },
    update_bean_by_pk: (result, args, cache, info) => {
      cache.writeFragment(fragment.beanInfo, result.update_bean_by_pk)
    },
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
      const key = 'Query'
      cache
        .inspectFields(key)
        .filter((field) => field.fieldName === 'recipe')
        .forEach((field) => {
          if (field.arguments.offset !== 0) {
            cache.invalidate(key, field.fieldKey)
          }
        })

      cache.updateQuery(
        {
          query: GET_ALL_RECIPES,
          variables: {
            limit: 10,
            offset: 0,
          },
        },
        (data) => {
          // Null error if user navigates to /recipe/new directly
          // Maybe we should avoid directly form navigation or use `writeFragment`
          // `unshift` adds to top of recipe results
          // [NEW BUG] Issue also happens when you log in on clicking 'Create Recipe'
          //  as logging in clears cache
          if (data) {
            data.recipe.unshift(result.insert_recipe_one)
            if (data.recipe.length > 10) {
              data.recipe.pop()
            }
            data.recipe_aggregate.aggregate.count++
          }
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
          data.recipe_by_pk.recipe_reviews.push(result.insert_recipe_review_one)
          return data
        }
      )
    },
    delete_recipe_review_by_pk: (result, args, cache, info) => {
      cache.invalidate({ __typename: 'recipe_review', id: args.id })
    },
  },
}
