import React from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import findIndex from 'lodash/findIndex';
// components
import Messages from '../../components/Messages/';
import Channels from '../../components/Channels/';
import Teams from '../../components/Teams/';
import Loader from '../../components/Loader';
// layouts
import FullHeight from '../../layout/FullHeight';
import FullHeightRow from '../../layout/FullHeightRow';

import { GET_USER } from '../../services/userService'


const ViewTeam = (props) => (
  <Query query={ GET_USER } fetchPolicy="network-only">
      {({ loading, error, data}) => {

        if(loading) return <Loader />
        if(error) return <p>Error: {JSON.stringify(error)}</p>

        const { teamId, channelId } = props.match.params;
        const { getUser } = data;

        const {teams, ...user} = getUser;
        
        if(!teams.length) {
          return <Redirect to="/team/create-team" />
        }

        const teamIdInteger = parseInt(teamId, 10);
        const teamIdx = teamIdInteger ? findIndex(teams, ['id', teamIdInteger]) : 0;
        const team = teamIdx === -1 ? teams[0] : teams[teamIdx];

        const channelIdInteger = parseInt(channelId, 10);
        const channels = team.channels;
        const channelIdx = channelIdInteger ? findIndex(channels, ['id',channelIdInteger]) : 0;
        const currentChannel = channelIdx === -1 ? team.channels[0] :team.channels[channelIdx];

        return (
          <FullHeight>
            <FullHeightRow gridSize={1} className={props.classes.team}>
              <Teams allTeams={teams} />
            </FullHeightRow>
            <FullHeightRow gridSize={2} className={props.classes.channel}>
              <Channels
                channels={channels}
                team={team}
                user={user}
                owner ={team.admin}
                currentTeamId={props.match.params.teamId}
                users={[{id:1, name: 'slackbot', status: 'online'},  {id:2, name: 'bob', status: 'offline'}]}
              />
            </FullHeightRow>
            <FullHeightRow gridSize={9}>
              <Messages
                channelName={currentChannel.name} channelId={currentChannel.id}
              />
            </FullHeightRow>
          </FullHeight>
        )
      }}
  </Query>
)

const styles = {
  team: {
    background: '#36173b'
  },
  channel: {
    background: '#563e58',
  },
  message: {
    overflow: 'auto',
    height: '100%',
  }
}

export default withStyles(styles)(ViewTeam);
