/* eslint max-len:0 */
import { formatErrors } from '../../utils';
import requiresAuth from '../permissions';

export default {
  Mutation: {
    createChannel: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const member = await models.Member.findOne({ where: { teamId: args.teamId, userId: user.id } }, { raw: true });
        if (!member.admin) {
          return {
            ok: false,
            errors: [
              {
                path: 'name',
                message: 'Not team owner',
              },

            ],
          };
        }

        const response = await models.sequelize.transaction(async (transaction) => {
          const channel = await models.Channel.create(args, { transaction });

          if (!args.public) {
            const members = args.members.filter(m => m.id !== user.id);
            members.push({ id: user.id, username: user.username });
            const channelMembers = members.map(m => ({ userId: m.id, channelId: channel.dataValues.id }));
            await models.ChannelMember.bulkCreate(channelMembers, { transaction });
          }

          return channel;
        });

        return {
          ok: true,
          channel: response,
        };
      } catch (error) {
        return {
          ok: false,
          errors: formatErrors(error),
        };
      }
    }),
  },
};
