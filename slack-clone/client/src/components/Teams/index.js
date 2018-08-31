import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles';

const TeamsContainer = (props) => {
  const { classes, allTeams } = props;

  const teams = allTeams.map(team => ({
    id: team.id,
    letter: team.name.charAt(0).toUpperCase(),
  }))

  const renderTeam = ({id, letter}) => (
    <Link to={`/team/view-team/${id}`} key={`team-${id}`}>
      <ListItem button className={classes.item}>
      <ListItemText primary={letter} classes={{
        primary: classes.text,
        root: classes.root,
      }} />
      </ListItem>
    </Link>
  )

    if(allTeams.length > 0 ) {
      return (
        <List>
          {teams.map(renderTeam)}
        </List>
      );
    }


    return (
      <p>Nothing to show</p>
    );
}

const styles = {
  item: {
    height:'50px',
    width: '50px',
    fontSize: '24px',
    borderRadius: '11px',
    backgroundColor: '#676066',
    marginBottom: '10px',
    padding: 0,
    transition: 'all .3s ease-out',
    '&:hover': {
      borderStyle: 'solid',
      borderWidth: 'thick',
      borderColor: '#767676',
    }
  },
  text: {
    color: '#fff'
  },
  root: {
    padding: 0,
    display: 'flex',
    justifyContent: 'center'
  }
}

export default withStyles(styles)(TeamsContainer);
