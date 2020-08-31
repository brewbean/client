import { gql } from 'apollo-boost';

export const INSERT_RECIPE_ONE = gql`
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
export const GET_ALL_RECIPE = gql`
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
  }
}
`;

export const GET_ALL_BEANS = gql`
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
  }
}
`;

export const GET_SINGLE_BEAN = gql`
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
  }
}
`;

