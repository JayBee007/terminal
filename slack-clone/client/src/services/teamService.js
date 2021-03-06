import gql from "graphql-tag";

export const GET_TEAM_MEMBERS = gql`
  query getTeamMembers($teamId: Int!) {
    getTeamMembers(teamId: $teamId) {
      id
      username
    }
  }
`;

export const CREATE_TEAM = gql`
  mutation createTeam($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

export const GET_ALL_TEAMS = gql`
  {
    allTeams {
      id
      name
    }
  }
`;

export const GET_ALL_TEAMS_AND_CHANNELS = gql`
  {
    allTeams {
      id
      name
      owner
      channels {
        id
        name
      }
    }
    inviteTeams {
      id
      name
      owner
      channels {
        id
        name
      }
    }
  }
`;

export const ADD_TEAM_MEMBER = gql`
  mutation addTeamMember($email: String!, $teamId: Int!) {
    addTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
