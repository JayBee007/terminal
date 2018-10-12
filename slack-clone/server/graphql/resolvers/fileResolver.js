/* eslint max-len:0 */
import fs from 'fs';
import path from 'path';
import shortid from 'shortid';
import { GraphQLUpload } from 'apollo-server-express';

import requiresAuth from '../permissions';
import pubsub from '../pubsub';
import { NEW_MESSAGE } from './messageResolver';

import { fileResize } from '../../utils';

const UPLOAD_DIR = path.join(__dirname, '../../uploads');

export default {
  Upload: GraphQLUpload,
  Mutation: {
    singleUpload: requiresAuth.createResolver(async (parent, { file, ...args }, { models, user }) => {
      try {
        const { stream, filename, mimetype } = await file;
        const { channelId } = args;
        const id = shortid.generate();
        const fileName = `${id}-${filename}`;
        const filePath = `${UPLOAD_DIR}/${fileName}`;

        if (!file) {
          throw new Error({ message: 'No files attached' });
        }

        stream.pipe(fileResize).pipe(fs.createWriteStream(filePath));

        models.sequelize.transaction(async (transaction) => {
          const message = await models.Message.create({
            text: filename,
            channelId,
            userId: user.id,
          }, { transaction });

          const uploadedFile = await models.File.create({
            type: mimetype,
            filepath: `http://localhost:4000/uploads/${fileName}`,
            filename: fileName,
            messageId: message.id,
          }, { transaction });

          pubsub.publish(NEW_MESSAGE, {
            messageAdded: {
              ...message.dataValues,
              file: {
                ...uploadedFile.dataValues,
              },
            },
            channelId,
          });
        });

        return true;
      } catch (error) {
        return false;
      }
    }),
  },
};
