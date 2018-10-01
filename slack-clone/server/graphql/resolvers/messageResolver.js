/* eslint max-len: 0 */
import { withFilter } from 'graphql-subscriptions';
import requiresAuth, { requiresTeamAccess } from '../permissions';

import pubsub from '../pubsub';

const NEW_MESSAGE = 'NEW_MESSAGE';

export default {
  Message: {
    user: requiresAuth.createResolver(async ({ userId }, args, { models, user }) => models.User.findOne({ where: { id: userId } })),
  },
  Subscription: {
    messageAdded: {
      subscribe: requiresTeamAccess.createResolver(withFilter(
        () => pubsub.asyncIterator(NEW_MESSAGE),
        (payload, args) => payload.messageAdded.channelId === args.channelId,
      )),
    },
  },
  Query: {
    getMessages: requiresAuth.createResolver(async (parent, { channelId }, { models, user }) => models.Message.findAll({ where: { channel_id: channelId } }, { raw: true })),
  },
  Mutation: {
    createMessage: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const message = await models.Message.create({
          ...args,
          userId: user.id,
        });
        pubsub.publish(NEW_MESSAGE, {
          messageAdded: message.dataValues,
          channelId: args.channelId,
        });
        return true;
      } catch (error) {
        // console.error('error', error);
        return false;
      }
    }),
  },
};
