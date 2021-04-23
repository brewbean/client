import { beanInfo, GET_ALL_BEANS } from 'queries/Bean'
import { GET_ALL_BREW_LOGS } from 'queries/BrewLog'
import { GET_ALL_RECIPES, recipeInfo } from 'queries/Recipe'

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
    insert_bean_review_one: (result, args, cache, info) => {
      let beanFragment = cache.readFragment(beanInfo, {
        id: args.object.bean_id,
      })
      beanFragment.bean_reviews.unshift(result.insert_bean_review_one)
      cache.writeFragment(beanInfo, beanFragment)
    },
    delete_bean_review_by_pk: (result, args, cache, info) => {
      cache.invalidate({ __typename: 'bean_review', id: args.id })
    },
    insert_brew_log_one: (result, args, cache, info) => {
      const key = 'Query'
      cache
        .inspectFields(key)
        .filter((field) => field.fieldName === 'brew_log')
        .forEach((field) => {
          if (field.arguments.offset !== 0) {
            cache.invalidate(key, field.fieldKey)
          }
        })
      cache.updateQuery(
        {
          query: GET_ALL_BREW_LOGS,
          variables: {
            limit: 10,
            offset: 0,
          },
        },
        (data) => {
          if (data) {
            data.brew_log.unshift(result.insert_brew_log_one)
            if (data.brew_log.length > 10) {
              data.brew_log.pop()
            }
            data.brew_log_aggregate.aggregate.count++
          }
          return data
        }
      )
    },
    delete_brew_log_by_pk: (result, args, cache, info) => {
      cache.invalidate({ __typename: 'brew_log', id: args.id })
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
    update_recipe_by_pk: (result, args, cache, info) => {
      if (args._set.is_deleted) {
        cache.invalidate({ __typename: 'recipe', id: args.pk_columns.id })
      }
    },
    insert_recipe_review_one: (result, args, cache, info) => {
      let recipeFragment = cache.readFragment(recipeInfo, {
        id: args.object.recipe_id,
      })
      recipeFragment.recipe_reviews.unshift(result.insert_recipe_review_one)
      cache.writeFragment(recipeInfo, recipeFragment)
    },
    delete_recipe_review_by_pk: (result, args, cache, info) => {
      cache.invalidate({ __typename: 'recipe_review', id: args.id })
    },
  },
}
