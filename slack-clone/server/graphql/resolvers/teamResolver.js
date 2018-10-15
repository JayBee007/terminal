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
  Query: {
    getTeamMembers: requiresAuth.createResolver(async (parent, { teamId }, { models }) => models.sequelize.query('select * from users as u join members as member on u.id = member.user_id where member.team_id =?', {
      replacements: [teamId],
      model: models.Team,
      raw: true,
    })),
  },
  Mutation: {
    createTeam: requiresAuth.createResolver(async (parent, args, { models, user }) => {
      try {
        const response = await models.sequelize.transaction(async (transaction) => {
          const team = await models.Team.create({ ...args }, { transaction });
          await models.Channel.create({
            name: 'general',
            teamId: team.id,
          }, { transaction });
          await models.Member.create({
            teamId: team.id,
            userId: user.id,
            admin: true,
          }, { transaction });
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
    channels: ({ id }, args, { models, user }) => models.sequelize.query('select distinct on (id) * from channels as channel left outer join channel_members as channelMember on channel.id = channelMember.channel_id  where channel.team_id = :teamId and (channel.public = true or channelMember.user_id = :userId ) ', {
      replacements: { teamId: id, userId: user.id },
      model: models.Channel,
      raw: true,
    }),


    // models.Channel.findAll({ where: { teamId: id } }),
    directMessageMembers: ({ id }, args, { models, user }) => models.sequelize.query(
      'select distinct on (u.id) u.id, u.username from users as u join direct_messages as dm on (u.id = dm.sender_id) or (u.id = dm.receiver_id) where (:currentUserId = dm.sender_id or :currentUserId = dm.receiver_id) and dm.team_id = :teamId',
      {
        replacements: { currentUserId: user.id, teamId: id },
        model: models.User,
        raw: true,
      },
    ),
  },
};
