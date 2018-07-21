export default `
  type Message {
    id: Int!
    test: String!
    user: User!
    channel: Channel!
  }

  type Mutation {
    createMessage(channelId: Int!, text: String!): Boolean!
  }
`;
