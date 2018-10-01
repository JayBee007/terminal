/* eslint max-len:0 */
/* eslint no-mixed-operators: 0 */
import { withFilter } from 'graphql-subscriptions';

import requiresAuth, { directMessageAccess } from '../permissions';
import pubsub from '../pubsub';

const NEW_DIRECT_MESSAGE = 'NEW_DIRECT_MESSAGE';

export default {
  DirectMessage: {
    sender: ({ sender, senderId }, args, { models }) => {
      if (sender) {
        return sender;
      }

      return models.User.findOne({ where: { id: senderId } }, { raw: true });
    },
  },
  Subscription: {
    newDirectMessage: {
      subscribe: directMessageAccess.createResolver(withFilter(
        () => pubsub.asyncIterator(NEW_DIRECT_MESSAGE),
        (payload, args, { user }) => payload.teamId === args.teamId && (payload.senderId === user.id && payload.receiverId === args.userId) || (payload.senderId === args.userId && payload.receiverId === user.id),
      )),
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
        const directMessage = await models.DirectMessage.create({
          ...args,
          senderId: user.id,
        });

        pubsub.publish(NEW_DIRECT_MESSAGE, {
          teamId: args.teamId,
          receiverId: args.receiverId,
          senderId: user.id,
          newDirectMessage: {
            ...directMessage.dataValues,

          },
        });
        return true;
      } catch (err) {
        // console.log(err);
        return false;
      }
    }),
  },
};
