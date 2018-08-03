const resolvers = {
  Mutation: {
    setUser: (_, variables, { cache }) => {
      const { id, token } = variables;

      const authUser = {
        id,
        token,
        __typename: 'AuthUser'
      }

      cache.writeData({ data: {authUser}});

      return authUser;
    }
  }
}


export default resolvers;
