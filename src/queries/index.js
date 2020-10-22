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