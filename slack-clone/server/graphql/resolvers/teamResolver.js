/* eslint max-len: 0 */
import { formatErrors } from '../../utils';
import requiresAuth from '../permissions';

export default {
  // Query: {
  //   allTeams: requiresAuth.createResolver(async (parent, args, { models, user }) => models.Team.findAll({ where: { owner: user.id } }, { raw: true })),
  //   inviteTeams: requiresAuth.createResolver(async (parent, args, { models, user }) => models.sequelize.query('select * from teams join members on id = team_id where user_id = ?', {
  //     replacements: [user.id],
  //     model: models.Team,
  //   })),
  //   inviteTeams: requiresAuth.createResolver(async (parent, args, { models, user }) => models.Team.findAll(
  //     {
  //       include: [
  //         {
  //           model: models.User,
  //           where: { id: user.id },
  //         },
  //       ],
  //     },
  //   ), { raw: true }),
  // },
  Mutation: {
    createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const response = await models.sequelize.transaction(async () => {
          const team = await models.Team.create({ ...args });
          await models.Channel.create({
            name: 'general',
            teamId: team.id,
          });
          await models.Member.create({
            teamId: team.id,
            userId: user.id,
            admin: true,
          });
          return team;
        });
        return {
          team: response,
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          errors: formatErrors(error, models),
        };
      }
    }),
    addTeamMember: requiresAuth.createResolver(async (parents, { email, teamId }, { models, user }) => {
      try {
        const memberPromise = models.Member.findOne({ where: { teamId, userId: user.id } }, { raw: true });
        const userToAddPromise = models.User.findOne({ where: { email } }, { raw: true });
        const [member, userToAdd] = await Promise.all([memberPromise, userToAddPromise]);

        if (!member.admin) {
          return {
            ok: false,
            errors: [{ path: 'email', message: 'Not the team owner' }],
          };
        }
        if (!userToAdd) {
          return {
            ok: false,
            errors: [{ path: 'email', message: 'User does not exist' }],
          };
        }
        await models.Member.create({ userId: userToAdd.id, teamId });
        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          errors: formatErrors(error, models),
        };
      }
    }),
  },
  Team: {
    channels: ({ id }, args, { models }) => models.Channel.findAll({ where: { teamId: id } }),
  },
};
