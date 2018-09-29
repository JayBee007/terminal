export default `

  type Team {
    id: Int!
    name: String!
    directMessageMembers: [User!]!
    channels: [Channel!]!
    admin: Boolean
  }

  type TeamResponse {
    ok: Boolean!
    team: Team
    errors: [Error!]
  }

  type AddTeamResponse {
    ok: Boolean!
    errors: [Error!]
  }

  type Query {
    allTeams: [Team!]!
    inviteTeams: [Team!]!
    getTeamMembers(teamId: Int!): [User!]!
  }

  type Mutation {
    createTeam(name: String!) : TeamResponse!
    addTeamMember(email: String!, teamId: Int!) : AddTeamResponse!
  }
`;
