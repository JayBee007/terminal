export default `
  type Message {
    id: Int!
    text: String!
    user: User!
    channel: Channel!
    created_at: String!
    file: File
  }

  type Subscription {
    messageAdded(channelId: Int!): Message
  }

  type Query {
    getMessages(channelId: Int!): [Message!]!
  }

  type Mutation {
    createMessage(channelId: Int!, text: String!): Boolean!
  }
`;
