import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';

// Apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from "react-apollo";

import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Routes />
    </Router>
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
