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
  recipe {
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
    # date_added 
  }
}
`;

export const GET_SINGLE_RECIPE = gql`
query get_recipes($id: number) {
  recipe {
    barista_id  
    bean_grind
    bean_id 
    bean_weight 
    brew_type 
    comment 
    id
    private 
    rating 
    water_temp 
  }
}
`;
// const body = {
//   query: `
//   mutation ($object: barista_insert_input!) {
//     insert_barista_one(object: $object) {
//       id
//       display_name
//       email
//       created_on
//     }
//   }
//   `,
//   variables: {
//     object: {
//       email,
//       display_name:display_name,
//       password: await bcrypt.hash(password, 10),
//     }
//   }
// }