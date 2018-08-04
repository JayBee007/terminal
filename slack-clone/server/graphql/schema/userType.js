export default `

  type User {
    id: Int!
    username: String!
    email: String!
    messages: Message!
    teams: [Team!]!
  }

  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }

  type AccessToken {
    id: Int
    token: String
    errors: [Error!]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AccessToken!
    login(email: String!, password: String!): AccessToken!
  }

`;
