const resolvers = {
  Mutation: {
    setUser: (_, variables, { cache }) => {
      const { id, token } = variables;

      const user = {
        id,
        token,
        __typename: 'User'
      }

      cache.writeData({ data: {user}});

      return user;
    }
  }
}


export default resolvers;
