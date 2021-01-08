import { GET_ALL_REVIEW_OF_BEAN } from 'queries'

export const updates = {
  updates: {
    Mutation: {
      insert_bean_reviews_one: (result, args, cache, info) => {
        cache.updateQuery(
          {
            query: GET_ALL_REVIEW_OF_BEAN,
            variables: { _eq: args.object.bean_id },
          },
          (data) => {
            data.bean_reviews_aggregate.nodes.push(
              result.insert_bean_reviews_one
            )
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
