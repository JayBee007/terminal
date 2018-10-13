import { ApolloClient } from "apollo-client";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { ApolloLink, Observable } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";

import { getUserFromLocalStorage } from "./services/authService";

import defaults from "./state/defaults";
import resolvers from "./state/resolvers";
import typeDefs from "./state/typeDefs";

const cache = new InMemoryCache({
  addTypename: false
});

const isFile = value =>
  (typeof File !== "undefined" && value instanceof File) ||
  (typeof Blob !== "undefined" && value instanceof Blob);

const isUpload = ({ variables }) => Object.values(variables).some(isFile);

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const fileUploadLink = createUploadLink({
  uri: "http://localhost:4000/graphql"
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/subscriptions`,
  options: {
    reconnect: true
  }
});

const subscriptionMiddleware = {
  applyMiddleware: async (options, next) => {
    const user = getUserFromLocalStorage();
    const token = user && JSON.parse(user).token;
    options.authToken = token;
    next();
  }
};

wsLink.subscriptionClient.use([subscriptionMiddleware]);

const subscriptionSplit = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const link = split(isUpload, fileUploadLink, subscriptionSplit);

const request = operation => {
  let headers;
  const user = getUserFromLocalStorage();
  if (user) {
    headers = {
      "x-token": JSON.parse(user).token
    };
    operation.setContext({ headers });
  }
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    withClientState({
      defaults,
      resolvers,
      typeDefs,
      cache
    }),
    requestLink,
    link
  ]),
  cache
});

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   request:(operation) => ,
//   clientState: {
//     defaults,
//     resolvers,
//     typeDefs
//   }
// });

export default client;
