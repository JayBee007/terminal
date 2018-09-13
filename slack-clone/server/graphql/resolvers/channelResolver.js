/* eslint max-len:0 */
import { formatErrors } from '../../utils';
import requiresAuth from '../permissions';

export default {
  Mutation: {
    createChannel: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const member = await models.Member.findOne({ where: { teamId: args.teamId, userId: user.id } }, { raw: true });
        if (!member) {
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
        const channel = await models.Channel.create(args);
        return {
          ok: true,
          channel,
        };
      } catch (error) {
        // console.log(error);
        return {
          ok: false,
          errors: formatErrors(error),
        };
      }
    }),
  },
};
