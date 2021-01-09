import { GET_SINGLE_BEAN_AND_BEAN_REVIEWS_AVG_BEAN_REVIEW } from 'queries'

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
