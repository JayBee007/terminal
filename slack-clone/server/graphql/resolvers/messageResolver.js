import requiresAuth from '../permissions';

export default {
  Message: {
    user: requiresAuth.createResolver(async ({ userId }, args, { models, user }) => models.User.findOne({ where: { id: userId } })),
  },
  Query: {
    getMessages: requiresAuth.createResolver(async (parent, { channelId }, { models, user }) => models.Message.findAll({ where: { channel_id: channelId } }, { raw: true })),
  },
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
