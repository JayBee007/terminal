import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// components
import Messages from '../../components/Messages/';
// layouts
import FullHeight from '../../layout/FullHeight';
import FullHeightRow from '../../layout/FullHeightRow';

const ViewTeam = (props) => (
  <FullHeight>
    <FullHeightRow gridSize={1} className={props.classes.team}>
      View
    </FullHeightRow>
    <FullHeightRow gridSize={2} className={props.classes.channel}>
      View
    </FullHeightRow>
    <FullHeightRow gridSize={9}>
      <Messages />
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
