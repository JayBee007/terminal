const typeDefs = `
  type AuthUser {
    id: Int!
    token: String!
  }

  type Mutation {
    setUser(id: Int!, token: String!): AuthUser
  }
`;

export default typeDefs;
