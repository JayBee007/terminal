const typeDefs = `
  type AuthUser {
    id: Int!
    token: String!,
    username: String!
  }

  type Mutation {
  setUser(id: Int!, token: String!, username: String!): AuthUser
  }
`;

export default typeDefs;
