import React from 'react';
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

import { GET_ALL_TEAMS_AND_CHANNELS } from '../../services/teamService';
const ViewTeam = (props) => (
  <Query query={ GET_ALL_TEAMS_AND_CHANNELS }>
      {({ loading, error, data}) => {

        if(loading) return <Loader />
        if(error) return <p>Error: {error}</p>

        const { teamId, channelId } = props.match.params;
        const { allTeams } = data;
        const teamIdx = teamId ? findIndex(allTeams, ['id', parseInt(teamId,10)]) : 0;
        const team = allTeams[teamIdx];
        const channels = team.channels;
        const channelIdx = channelId ? findIndex(channels, ['id',parseInt(channelId, 10)]) : 0;
        const currentChannel = team.channels[channelIdx];

        return (
          <FullHeight>
            <FullHeightRow gridSize={1} className={props.classes.team}>
              <Teams allTeams={allTeams} />
            </FullHeightRow>
            <FullHeightRow gridSize={2} className={props.classes.channel}>
              <Channels
                channels={channels}
                team={team}
                currentTeamId={props.match.params.teamId}
                users={[{id:1, name: 'slackbot', status: 'online'},  {id:2, name: 'bob', status: 'offline'}]}
              />
            </FullHeightRow>
            <FullHeightRow gridSize={9}>
              <Messages
                channelName={currentChannel.name}
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
  }
}

export default withStyles(styles)(ViewTeam);
