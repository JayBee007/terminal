import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import { formatErrors } from '../../utils';


export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
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
        };
      } catch (error) {
        return {
          errors: formatErrors(error, models),
        };
      }
    },
  },
};
