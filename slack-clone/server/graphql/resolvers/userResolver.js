/* eslint max-len:0 */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import requiresAuth from '../permissions';
import { formatErrors } from '../../utils';

export default {
  User: {
    teams: (parent, args, { models, user }) => models.sequelize.query('select * from teams as team join members as member on team.id = member.team_id where user_id =?', {
      replacements: [user.id],
      model: models.Team,
    }),
  },
  Query: {
    getUser: requiresAuth.createResolver((parent, args, { models, user }) => models.User.findOne({ where: { id: user.id } })),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    login: async (parent, { email, password }, { models }) => {
      try {
        const user = await models.User.findOne({ where: { email }, raw: true });
        if (!user) {
          return {
            errors: [
              {
                path: 'email',
                message: 'invalid email or password',
              },
            ],
          };
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          return {
            errors: [
              {
                path: 'email',
                message: 'invalid email or password',
              },
            ],
          };
        }

        return {
          id: user.id,
          token: jwt.sign({
            id: user.id,
            email: user.email,
          }, process.env.JWT_KEY),
          username: user.username,
        };
      } catch (error) {
        return {
          errors: [
            {
              path: 'email',
              message: 'something went wrong',
            },
          ],
        };
      }
    },
    register: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args);
        return {
          id: user.id,
          token: jwt.sign({
            id: user.id,
            email: user.email,
          }, process.env.JWT_KEY),
          username: user.username,
        };
      } catch (error) {
        return {
          errors: formatErrors(error, models),
        };
      }
    },
  },
};
