import { gql } from 'apollo-boost';

export const GET_BARISTA = gql`
query Test {
  barista {
    email
  }
}
`;

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