import React from 'react';
import { withStyles } from '@material-ui/core/styles';
// components
import Messages from '../../components/Messages/';
import Channels from '../../components/Channels/';
import Teams from '../../components/Teams/';
// layouts
import FullHeight from '../../layout/FullHeight';
import FullHeightRow from '../../layout/FullHeightRow';

const ViewTeam = (props) => (
  <FullHeight>
    <FullHeightRow gridSize={1} className={props.classes.team}>
      <Teams />
    </FullHeightRow>
    <FullHeightRow gridSize={2} className={props.classes.channel}>
      <Channels
        teamName="Avengers"
        userName="Jay"
        channels={[{id: 1, name: 'general'}, {id:2, name: 'random'}]}
        users={[{id:1, name: 'slackbot', status: 'online'},  {id:2, name: 'bob', status: 'offline'}]}
      />
    </FullHeightRow>
    <FullHeightRow gridSize={9}>
      <Messages
        channelName="general"
      />
    </FullHeightRow>
  </FullHeight>
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
