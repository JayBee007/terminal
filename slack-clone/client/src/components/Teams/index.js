import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const TeamsContainer = (props) => {
  const { teams } = props;

  const renderTeam = ({id, letter}) => (
    <ListItem key={`team-${id}`} button>
      <ListItemText primary={letter} />
    </ListItem>
  )
  return (
    <List>
      {teams.map(renderTeam)}
    </List>
  )
}

export default TeamsContainer;
