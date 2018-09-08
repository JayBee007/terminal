import requiresAuth from '../permissions';

export default {
  Mutation: {
    createMessage: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        await models.Message.create({
          ...args,
          userId: user.id,
        });
        return true;
      } catch (error) {
        // console.log(error);
        return false;
      }
    }),
  },
};
