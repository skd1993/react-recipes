import { gql } from "apollo-boost";

export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      name
      description
      instructions
      category
      likes
      createdDate
      username
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
mutation (
  $username: String!,
  $password: String!
){
  signinUser (
    username: $username,
    password: $password,
  )
  {
    token
  }
}
`;
