import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const ChannelsContainer = (props) => {
  const { teamName, userName, users, channels} = props;

  const renderChannel = ({id, name}) => (
    <ListItem key={`channel-${id}`} button>
      <ListItemText primary={`#${name}`} />
    </ListItem>
  )

  const renderUser = ({id, name}) => (
    <ListItem key={`user-${id}`} button>
      <ListItemText primary={name} />
    </ListItem>
  )

  return (
    <React.Fragment>
      <div>
        <Divider />
        <Typography>
          {teamName}
        </Typography>
        <Typography>
          {userName}
        </Typography>
      </div>
      <div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary="Channels" />
          </ListItem>
          {channels.map(renderChannel)}
        </List>
      </div>
      <div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemText primary="Users" />
          </ListItem>
          {users.map(renderUser)}
        </List>
      </div>
    </React.Fragment>
  )
}

export default ChannelsContainer;
