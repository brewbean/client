import { GET_SINGLE_BEAN_AND_AVG_BEAN_REVIEW } from 'queries'

export const updates = {
  updates: {
    Mutation: {
      insert_bean_reviews_one: (result, args, cache, info) => {
        cache.updateQuery(
          {
            query: GET_SINGLE_BEAN_AND_AVG_BEAN_REVIEW,
            variables: { id: args.object.bean_id },
          },
          (data) => {
            data.bean_reviews.push(result.insert_bean_reviews_one)
            return data
          }
        )
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
