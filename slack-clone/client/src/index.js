import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

// Apollo
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from "react-apollo";
import { persistCache } from 'apollo-cache-persist';

import Routes from './routes';

import defaults from './state/defaults';
import resolvers from './state/resolvers';
import typeDefs from './state/typeDefs';

import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  clientState: {
    defaults,
    resolvers,
    typeDefs
  }
});

// const { id, token } = getUserFromLocalStorage();

// client.mutate({
//   variables: {id, token},
//   mutation: SET_USER
// });

const App = () => (
  <ApolloProvider client={client}>
    <React.Fragment>
      <CssBaseline />
    </React.Fragment>
    <Router>
      <Routes />
    </Router>
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
