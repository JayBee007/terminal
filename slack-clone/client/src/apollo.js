import ApolloClient from 'apollo-boost';

import { getUserFromLocalStorage } from './services/authService';

import defaults from './state/defaults';
import resolvers from './state/resolvers';
import typeDefs from './state/typeDefs';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  request:(operation) => {
    const user  = getUserFromLocalStorage();
    let headers;
    if(user) {
      headers = {
        'x-token': JSON.parse(user).token
      }
      operation.setContext({headers})
    }
  },
  clientState: {
    defaults,
    resolvers,
    typeDefs
  }
});


export default client;
