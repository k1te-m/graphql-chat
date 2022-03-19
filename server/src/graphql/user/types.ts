import { gql } from "apollo-server-express";

export const userType = gql`
  scalar Date
  type UserModel {
    id: ID!
    name: String!
    username: String!
    email: String!
    last_login: Date
    register_date: Date
  }
  type User {
    user: UserModel!
    token: String!
  }

  input RegisterUserInput {
    name: String!
    username: String!
    email: String!
    password: String!
    passwordConfirm: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    RegisterUser(input: RegisterUserInput!): User!
    LoginUser(input: LoginUserInput): User!
  }
`;
