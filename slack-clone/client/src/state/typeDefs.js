const typeDefs = `
  type User {
    id: Int!
    token: String!
  }

  type Mutation {
    setUser(id: Int!, token: String!): User
  }
`;

export default typeDefs;
