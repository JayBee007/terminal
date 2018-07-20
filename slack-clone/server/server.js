/* eslint no-console: 0 */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

const PORT = 4000;

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log('Server ready');
});
