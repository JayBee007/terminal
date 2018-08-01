import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
export default {
  Query: {
    getUser: (parent, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.User.findAll(),
  },
  Mutation: {
    register: async (parent, { password, ...restArgs }, { models }) => {
      try {
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
        return error;
      }
    },
  },
};
