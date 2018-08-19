import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const ChannelsContainer = (props) => {
  const { teamName, userName, users, channels, classes} = props;

  const renderChannel = ({id, name}) => (
    <ListItem key={`channel-${id}`} button className={classes.listItem}>
      <ListItemText primary={`#${name}`}  classes={{
        primary: classes.listText
      }}/>
    </ListItem>
  )

  const renderUser = ({id, name, status}) => (
    <ListItem key={`user-${id}`} button className={classes.listItem}>

      <ListItemText classes={{ primary: classes.listText }}>
        <span className={`${classes.status} ${status === 'online' ? classes.online : classes.offline}`}></span> {name}
      </ListItemText>
    </ListItem>
  )

  return (
    <React.Fragment>
      <div>
        <Typography variant="headline" className={classes.teamName}>
          {teamName}
        </Typography>
        <Typography>
          {userName}
        </Typography>
      </div>
      <div style={{marginRight: '-1rem', marginLeft: '-1rem'}}>
        <Divider />
        <List>
          <ListItem button className={classes.channelItem}>
            <ListItemText primary="Channels" classes={{
              primary: classes.channelText
            }} />
          </ListItem>
          {channels.map(renderChannel)}
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
          {users.map(renderUser)}
        </List>
      </div>
    </React.Fragment>
  )
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
  }
}

export default withStyles(styles)(ChannelsContainer);
