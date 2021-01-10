import {
  GET_SINGLE_BEAN_AND_BEAN_REVIEWS_AVG_BEAN_REVIEW,
  GET_ALL_BREW_LOGS,
} from 'queries'

export const updates = {
  updates: {
    Mutation: {
      insert_bean_reviews_one: (result, args, cache, info) => {
        cache.updateQuery(
          {
            query: GET_SINGLE_BEAN_AND_BEAN_REVIEWS_AVG_BEAN_REVIEW,
            variables: { id: args.object.bean_id },
          },
          (data) => {
            data.bean_reviews.push(result.insert_bean_reviews_one)
            return data
          }
        )
      },
      delete_bean_reviews_by_pk: (result, args, cache, info) => {
        cache.invalidate({ __typename: 'bean_reviews', id: args.id })
      },
      insert_brew_logs_one: (result, args, cache, info) => {
        cache.updateQuery(
          {
            query: GET_ALL_BREW_LOGS,
          },
          (data) => {
            data.brew_logs.push(result.insert_brew_logs_one)
            return data
          }
        )
      },
      delete_brew_logs_by_pk: (result, args, cache, info) => {
        cache.invalidate({ __typename: 'brew_logs', id: args.id })
      },
    },
  },
}

export const keys = {
  keys: {
    bean_reviews_aggregate: () => null,
    bean_reviews_aggregate_fields: () => null,
    bean_reviews_avg_fields: () => null,
  },
}
