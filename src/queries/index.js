/*
  Recipe Queries
*/
export const INSERT_RECIPE_ONE = `
mutation insert_recipe_one($object: recipe_insert_input!) {
  insert_recipe_one(object: $object) {
    id
    bean_grind 
    bean_weight
    brew_type
    rating
    water_temp
    barista_id
  }
}
`;
export const GET_ALL_RECIPE = `
query get_recipes {
  recipe (order_by: { id: desc }) {
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
    private
    date_added 
    bean {
      img
      name
    }
  }
}
`;
export const GET_SINGLE_RECIPE = `
query get_single_recipe($id:Int!) {
  recipe_by_pk(id:$id) {
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
    private
    date_added 
    bean {
      img
      name
    }
  }
}
`;

export const UPDATE_RECIPE = `
mutation update_recipe($id: Int!,$water_temp: Int, $water_amount: Int, $rating: jsonb, $comment: String, $brew_type: String, $bean_weight: Int, $bean_id: Int, $bean_grind: String) {
  update_recipe_by_pk(pk_columns: {id: $id}, _set: {water_temp: $water_temp,water_amount: $water_amount,rating: $rating,comment: $comment,brew_type: $brew_type,bean_weight: $bean_weight,bean_grind: $bean_grind,bean_id: $bean_id}) {
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
export const DELETE_RECIPE = `
mutation delete_recipe($id: Int!) {
  delete_recipe_by_pk(id: $id) {
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
`;

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
`;
export const GET_SINGLE_BEAN_ID_BY_NAME = `
query get_single_bean_id($_eq: String!) {
  bean(where: {name: {_eq: $_eq}}) {
    name
    id
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
`;

export const GET_SINGLE_REVIEW = `
query get_single_review($id:Int!){
  bean_reviews_by_pk(id:$id) {
    id
    barista_id
    bean_id
    rating
    comment
  }
}
`;

export const GET_ALL_REVIEW_OF_BEAN = `
query get_all_review_of_bean($_eq: Int!) {
  bean_reviews_aggregate(where: {bean_id: {_eq: $_eq}}) {
    nodes {
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
`;

export const UPDATE_BEAN_REVIEW = `
mutation update_bean_reviews($id: Int!, $comment: String) {
  update_bean_reviews_by_pk(pk_columns: {id: $id}, _set: {comment: $comment}) {
    comment
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
`;