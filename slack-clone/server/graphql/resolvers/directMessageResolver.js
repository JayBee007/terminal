/* eslint max-len:0 */
import requiresAuth from '../permissions';

export default {
  DirectMessage: {
    sender: ({ sender, senderId }, args, { models }) => {
      if (sender) {
        return sender;
      }

      return models.User.findOne({ where: { id: senderId } }, { raw: true });
    },
  },
  Query: {
    directMessages: requiresAuth.createResolver(async (parent, { teamId, userId }, { models, user }) => models.DirectMessage.findAll({
      order: [['created_at', 'ASC']],
      where: {
        teamId,
        [models.sequelize.Op.or]: [
          {
            [models.sequelize.Op.and]: [{ receiverId: userId }, { senderId: user.id }],
          },
          {
            [models.sequelize.Op.and]: [{ receiverId: user.id }, { senderId: userId }],
          },
        ],
      },
    })),
  },
  Mutation: {
    createDirectMessage: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        await models.DirectMessage.create({
          ...args,
          senderId: user.id,
        });
        return true;
      } catch (err) {
        // console.log(err);
        return false;
      }
    }),
  },
};
