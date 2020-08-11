import { gql } from 'apollo-boost';

export const GET_BARISTA = gql`
query Test {
  barista {
    email
  }
}
`;