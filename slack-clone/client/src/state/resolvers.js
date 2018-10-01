const resolvers = {
  Mutation: {
    setUser: (_, variables, { cache }) => {
      const { id, token, username } = variables;

      const authUser = {
        id,
        token,
        username,
        __typename: "AuthUser"
      };

      cache.writeData({ data: { authUser } });

      return authUser;
    }
  }
};

export default resolvers;
