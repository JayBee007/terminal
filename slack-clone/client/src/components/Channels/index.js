import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';


import CreateChannelModal from './CreateChannelModal';
import InvitePeopleModal from './InvitePeopleModal';
import DirectMessageModal from './DirectMessageModal';

class ChannelsContainer extends React.Component {

  state = {
    createChannelModalVisible: false,
    invitePeopleModalVisible: false,
    directMessageModalVisible: false,
  }

  handleModalVisiblity = () => {
    this.setState(prevState => ({
      createChannelModalVisible: !prevState.createChannelModalVisible
    }));
  }

  handleInvitePeopleModal = () => {
    this.setState(prevState => ({
      invitePeopleModalVisible: !prevState.invitePeopleModalVisible,
    }));
  }

  handleDirectMessageModal = () => {
    this.setState(prevState => ({
      directMessageModalVisible: !prevState.directMessageModalVisible,
    }));
  }

  renderChannel = ({id, name}, teamId) => (
    <ListItem key={`channel-${id}`} button className={this.props.classes.listItem}>
      <ListItemText classes={{ primary: this.props.classes.listText }}>
        <Link to={`/team/view-team/${teamId}/${id}`}>{`#${name}`}</Link>
      </ListItemText>
    </ListItem>
  )

  renderUser = ({id, username, status}) => {
    const { team, currentChannel } = this.props;
    return (
      <Link to={`/team/view-team/${team.id}/${currentChannel.id}/user/${id}`} key={`user-${id}`}>
        <ListItem  button className={this.props.classes.listItem}>

          <ListItemText classes={{ primary: this.props.classes.listText }}>
            <span className={`${this.props.classes.status} ${status === 'online' ? this.props.classes.online : this.props.classes.offline}`}></span> {username}
          </ListItemText>
        </ListItem>
      </Link>
    )
  }

  render() {

    const { users, classes, channels, team, owner, user, currentChannel } = this.props;
    const { createChannelModalVisible, invitePeopleModalVisible, directMessageModalVisible } = this.state;

    return (
      <React.Fragment>
        <div>
          <Typography variant="headline" className={classes.teamName}>
            {team.name}
          </Typography>
          <Typography>
            {user.username}
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
                { owner &&  <Icon
                  color="action"
                  className={classes.icon}
                  onClick={this.handleModalVisiblity}>
                    add_circle
                </Icon> }
              </ListItemText>
            </ListItem>
            {channels.map(channel => this.renderChannel(channel, team.id))}
          </List>
        </div>
        <div style={{marginRight: '-1rem', marginLeft: '-1rem'}}>
          <Divider />
          <List>
            <ListItem button className={classes.channelItem}>
              <ListItemText classes={{
                primary: classes.channelText
              }}>
                Direct Messages
                <Icon
                  color="action"
                  className={classes.icon}
                  onClick={this.handleDirectMessageModal}>
                    add_circle
                </Icon>
              </ListItemText>
            </ListItem>
            {users.map(this.renderUser)}
          </List>
        </div>
        <div style={{marginRight: '-1rem', marginLeft: '-1rem'}}>
          <Divider />
          {owner && <Link
            to='#'
            style={{paddingLeft: '0.7rem', paddingTop: '0.5rem', display:'block'}}
            onClick={this.handleInvitePeopleModal}>
              + Invite People
          </Link>}
        </div>
        <CreateChannelModal isOpen={createChannelModalVisible} handleModalVisiblity={this.handleModalVisiblity} teamId={team.id}/>
        <InvitePeopleModal isOpen={invitePeopleModalVisible} handleModalVisiblity={this.handleInvitePeopleModal} teamId={team.id}/>
        <DirectMessageModal isOpen={directMessageModalVisible} handleModalVisiblity={this.handleDirectMessageModal} teamId={team.id} channelId={currentChannel.id}/>
      </React.Fragment>
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
