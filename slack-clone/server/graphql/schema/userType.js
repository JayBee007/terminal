export default `

  type User {
    id: Int!
    username: String!
    email: String!
    messages: Message!
    teams: [Team!]!
  }

  type Query {
    getUser: User!
    allUsers: [User!]!
  }

  type AccessToken {
    id: Int
    token: String
    username: String
    errors: [Error!]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AccessToken!
    login(email: String!, password: String!): AccessToken!
  }

`;
