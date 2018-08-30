import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import findIndex from 'lodash/findIndex';

import { getUserFromLocalStorage } from '../../services/authService';

import Loader from '../../components/Loader';
import CreateChannelModal from './CreateChannelModal';

import { GET_ALL_TEAMS_AND_CHANNELS } from '../../services/teamService';

class ChannelsContainer extends React.Component {

  state = {
    createChannelModalVisible: false
  }

  handleModalVisiblity = () => {
    this.setState(prevState => ({
      createChannelModalVisible: !prevState.createChannelModalVisible
    }));
  }

  renderChannel = ({id, name}) => (
    <ListItem key={`channel-${id}`} button className={this.props.classes.listItem}>
      <ListItemText primary={`#${name}`}  classes={{
        primary: this.props.classes.listText
      }}/>
    </ListItem>
  )

  renderUser = ({id, name, status}) => (
    <ListItem key={`user-${id}`} button className={this.props.classes.listItem}>

      <ListItemText classes={{ primary: this.props.classes.listText }}>
        <span className={`${this.props.classes.status} ${status === 'online' ? this.props.classes.online : this.props.classes.offline}`}></span> {name}
      </ListItemText>
    </ListItem>
  )

  render() {

    const { users, classes, currentTeamId } = this.props;
    const { createChannelModalVisible } = this.state;
    const user = getUserFromLocalStorage();
    const userName = JSON.parse(user).username;

    return (
      <Query query={ GET_ALL_TEAMS_AND_CHANNELS }>
      {({ loading, error, data}) => {

        if(loading) return <Loader />
        if(error) return <p>Error: {error}</p>

        const { allTeams } = data;
        const teamIdx = currentTeamId ? findIndex(allTeams, ['id', parseInt(currentTeamId,10)]) : 0;
        const team = allTeams[teamIdx];
        const channels = team.channels;

        return (
          <React.Fragment>
            <div>
              <Typography variant="headline" className={classes.teamName}>
                {team.name}
              </Typography>
              <Typography>
                {userName}
              </Typography>
            </div>
            <div style={{marginRight: '-1rem', marginLeft: '-1rem'}}>
              <Divider />
              <List>
                <ListItem button className={classes.channelItem}>
                  <ListItemText classes={{
                    primary: classes.channelText
                  }}>
                    Channels
                    <Icon
                      color="action"
                      className={classes.icon}
                      onClick={this.handleModalVisiblity}>
                        add_circle
                    </Icon>
                  </ListItemText>
                </ListItem>
                {channels.map(this.renderChannel)}
              </List>
            </div>
            <div style={{marginRight: '-1rem', marginLeft: '-1rem'}}>
              <Divider />
              <List>
                <ListItem button className={classes.channelItem}>
                  <ListItemText primary="Direct Messages" classes={{
                    primary: classes.channelText
                  }} />
                </ListItem>
                {users.map(this.renderUser)}
              </List>
            </div>
            <CreateChannelModal isOpen={createChannelModalVisible} handleModalVisiblity={this.handleModalVisiblity} teamId={team.id}/>
          </React.Fragment>
        )
      }}
      </Query>
    )
  }
}

const styles = {
  teamName: {
    color: '#fff',
  },
  listItem: {
    padding: '0 0 0 1rem',
  },
  listText: {
    color: '#ddd',
  },
  channelItem: {
    padding: '0 0 0 0.7rem'
  },
  channelText: {
    color: '#ddd',
  },
  status: {
    display: 'inline-block',
    height: '8px',
    width: '8px',
    borderRadius: '50%',
  },
  online: {
    background: '#38978d',
  },
  offline: {
    border: '1px solid #ddd'
  },
  icon: {
    fontSize: '16px',
    marginLeft: '5px',
    display: 'inline-block',
    lineHeight: '20px',
  }
}

export default withStyles(styles)(ChannelsContainer);
