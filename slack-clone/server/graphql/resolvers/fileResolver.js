import { GraphQLUpload } from 'apollo-server-express';

import requiresAuth from '../permissions';

export default {
  Upload: GraphQLUpload,
  Mutation: {
    singleUpload: requiresAuth.createResolver(async (parent, { file }) => ({
      filename: 'filename',
      mimetype: 'mimetype',
      encoding: 'encoding',
    })),
  },
};
