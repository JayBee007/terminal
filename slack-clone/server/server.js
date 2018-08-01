/* eslint no-console: 0 */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import models from './db';

require('dotenv').config();

const PORT = 4000;

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './graphql/schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './graphql/resolvers')));

const app = express();
const server = new ApolloServer({ typeDefs, resolvers, context: { models, user: { id: 1 } } });

server.applyMiddleware({ app });

models.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Server ready');
  });
});
