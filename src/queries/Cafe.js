import { gql } from 'urql'

/**
 * Fragments
 */
export const cafeReviewInfo = gql`
  fragment CafeReviewInfo on cafe_review {
    id
    barista {
      id
      display_name
      avatar
    }
    comment
    date_added
    date_updated
    thumb_up
  }
`

export const cafeInfo = gql`
  fragment CafeInfo on cafe {
    id
    slug
    city
    content
    phone_number
    tags
    name
    location
    location_link
    hours
    pictures
    site_text
    site_link
    cafe_reviews_aggregate(where: { thumb_up: { _eq: true } }) {
      aggregate {
        count
      }
    }
    cafe_reviews(order_by: { date_updated: desc }) {
      ...CafeReviewInfo
    }
    ${cafeReviewInfo}
  }
`

export const GET_CAFE = gql`
  query GetCafe($slug: String!) {
    cafe(where: { slug: { _eq: $slug } }) {
      ...CafeInfo
    }
  }
  ${cafeInfo}
`
