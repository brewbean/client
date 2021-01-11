/*
  Brew Logs Queries
*/
export const INSERT_BREW_LOGS_ONE = `
mutation insert_brew_logs_one($object: brew_logs_insert_input!) {
  insert_brew_logs_one(object: $object) {
    id
    bean_grind 
    bean_weight
    brew_type
    rating
    water_temp
    barista_id
  }
}
`
export const GET_ALL_BREW_LOGS = `
query get_brew_logs {
  brew_logs (order_by: { id: desc }) {
    id
    barista_id  
    brew_type 
    bean_weight 
    bean_grind
    water_amount
    bean_id 
    water_temp 
    rating 
    comment 
    privated
    date_added 
    bean {
      id
      img
      name
    }
  }
}
`
export const GET_SINGLE_BREW_LOG = `
query get_single_brew_log($id:Int!) {
  brew_logs_by_pk(id:$id) { 
    id
    barista_id  
    brew_type 
    bean_weight 
    bean_grind 
    water_amount
    bean_id 
    water_temp 
    rating 
    comment 
    privated
    date_added 
    bean {
      img
      name
    }
  }
}
`

export const UPDATE_BREW_LOGS = `
mutation update_brew_logs($id: Int!, $object: brew_logs_set_input) {
  update_brew_logs_by_pk(pk_columns: {id: $id}, _set: $object) {
    comment
    bean_grind
    bean_id
    bean_weight
    brew_type
    rating
    water_amount
    water_temp
  }
}
`
export const DELETE_BREW_LOGS = `
mutation delete_brew_logs($id: Int!) {
  delete_brew_logs_by_pk(id: $id) {
    id
  }
}
`
/*
  Bean Queries
*/
export const GET_ALL_BEANS = `
query get_beans {
  bean (order_by: { id: asc }) {
    id
    company_name
    name
    altitude
    process
    profile_note
    region
    roast_type
    img
    about
    price
    rating
  }
}
`

export const GET_SINGLE_BEAN = `
query get_single_bean($id:Int!){
  bean_by_pk(id:$id) {
    id
    company_name
    name
    altitude
    process
    profile_note
    region
    roast_type
    img
    about
    price
    rating
  }
}
`
export const GET_SINGLE_BEAN_ID_BY_NAME = `
query get_single_bean_id($_eq: String!) {
  bean(where: {name: {_eq: $_eq}}) {
    name
    id
  }
}
`

export const GET_SINGLE_BEAN_AND_AVG_BEAN_REVIEW = `
query get_bean_and_avg_review($id: Int!) {
  bean_by_pk(id:$id) {
    id
    company_name
    name
    altitude
    process
    profile_note
    region
    roast_type
    img
    about
    price
    rating
  }
  bean_reviews_aggregate(where: {bean_id: {_eq: $id}}) {
    aggregate {
      avg {
        rating
      }
    }
  }
}
`
/*
  Review Queries
*/
export const INSERT_REVIEW_ONE = `
mutation insert_bean_reviews_one($object: bean_reviews_insert_input!) {
  insert_bean_reviews_one(object: $object) {
    id
    barista_id 
    bean_id
    rating
    comment
  }
}
`

export const GET_SINGLE_REVIEW = `
query get_single_review($id:Int!){
  bean_reviews_by_pk(id:$id) {
    id
    barista_id
    bean_id
    rating
    comment
    bean {
      name
    }
  }
}
`

export const GET_ALL_REVIEW_OF_BEAN = `
query get_all_review_of_bean($_eq: Int!) {
  bean_reviews_aggregate(where: {bean_id: {_eq: $_eq}}) {
    nodes {
      id
      barista_id
      bean_id
      rating
      comment
      barista {
        display_name
      }
    }
  }
}
`

export const UPDATE_BEAN_REVIEW = `
mutation update_bean_reviews($id: Int!, $object: bean_reviews_set_input!) {
  update_bean_reviews_by_pk(pk_columns: {id: $id}, _set: $object) {
    id
    comment
    rating
  }
}
`
export const DELETE_BEAN_REVIEW = `
mutation delete_bean_reviews($id: Int!) {
  delete_bean_reviews_by_pk(id: $id) {
    id
  }
}
`
export const GET_AVG_REVIEW_OF_BEAN = `
query get_avg_review_of_bean($id: Int!) {
  bean_reviews_aggregate(where: {bean_id: {_eq: $id}}) {
    aggregate {
      avg {
        rating
      }
    }
  }
}
`

export const GET_BARISTA = `
  query {
    barista { 
      id
      email
      display_name
      avatar
      created_on
    }
  }
`
/*
  Recipe Queries
*/
export const INSERT_RECIPES_ONE = `
mutation insert_recipes_one($object: recipes_insert_input!) {
  insert_recipes_one(object: $object) {
    id
    bean_grind 
    bean_weight
    brew_type
    rating
    water_temp
    barista_id
  }
}
`
export const GET_ALL_RECIPES = `
query get_recipes {
  recipes (order_by: { id: desc }) {
    id
    barista_id  
    brew_type 
    bean_weight 
    bean_grind
    water_amount
    bean_id 
    water_temp 
    rating 
    comment 
    privated
    date_added 
    barista {
      id
      display_name
    }
    bean {
      id
      img
      name
    }
  }
}
`
export const GET_SINGLE_RECIPE_REVIEWS_AVG_REVIEW = `
  query get_recipe_reviews_avg_review($id: Int!) {
    recipes_by_pk (id: $id) {
      id
      barista_id  
      brew_type 
      bean_weight 
      bean_grind
      water_amount
      bean_id 
      water_temp 
      rating 
      comment 
      privated
      date_added 
      barista {
        id
        display_name
      }
      bean {
        id
        img
        name
      }
    }
    recipe_reviews(where: { recipe_id: { _eq: $id } }) {
      id
      barista_id
      recipe_id
      rating
      comment
      barista {
        id
        display_name
      }
    }
    recipe_reviews_aggregate(where: { recipe_id: { _eq: $id } }) {
      aggregate {
        avg {
          rating
        }
      }
    }
  
}
`
export const GET_SINGLE_RECIPE = `
query get_single_recipe($id:Int!) {
  recipes_by_pk(id:$id) { 
    id
    barista_id  
    brew_type 
    bean_weight 
    bean_grind 
    water_amount
    bean_id 
    water_temp 
    rating 
    comment 
    privated
    date_added 
    bean {
      img
      name
    }
  }
}
`

export const UPDATE_RECIPES = `
mutation update_recipes($id: Int!, $object: recipes_set_input) {
  update_recipes_by_pk(pk_columns: {id: $id}, _set: $object) {
    comment
    bean_grind
    bean_id
    bean_weight
    brew_type
    rating
    water_amount
    water_temp
  }
}
`
export const DELETE_RECIPES = `
mutation delete_recipes($id: Int!) {
  delete_recipes_by_pk(id: $id) {
    id
  }
}
`
export const DELETE_RECIPE_REVIEW = `
mutation delete_recipe_reviews($id: Int!) {
  delete_recipe_reviews_by_pk(id: $id) {
    id
    recipe_id
  }
}
`
