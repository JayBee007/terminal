export default `

  type Team {
    owner: User!
    members: [User!]!
    channels: [Channel!]!
  }

  type Channel {
    id: Int!
    name: String!
    public: Boolean!
    messages: [Message!]!
    users: [Users!]!
  }

  type Message {
    id: Int!
    test: String!
    user: User!
    channel: Channel!
  }

  type User {
     id: Int!
     username: String!
     email: String!
     messages: Message!
     teams: [Team!]!
  }

  type Query {
    hi: String
  }
`;
