import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

const formatErrors = (e, models) => {
  if (e instanceof models.sequelize.ValidationError) {
    return e.errors.map(x => _.pick(x, ['path', 'message']));
  }

  return [{ path: 'name', message: 'something went wrong' }];
};

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
    register: async (parent, { password, ...restArgs }, { models }) => {
      try {
        if (password.length < 5 || password.length > 100) {
          return {
            errors: [
              {
                path: 'password',
                message: 'password needs to be between 5 and 100 characters',
              },
            ],
          };
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await models.User.create({ password: hashedPassword, ...restArgs });
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
