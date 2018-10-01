import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import CssBaseline from "@material-ui/core/CssBaseline";

import Routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import client from "./apollo";

import "./index.css";

const App = () => (
  <ApolloProvider client={client}>
    <React.Fragment>
      <CssBaseline />
    </React.Fragment>
    <Router>
      <Routes />
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
