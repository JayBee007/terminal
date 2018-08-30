import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles';
import { Query } from 'react-apollo';

import Loader from '../../components/Loader';

import { GET_ALL_TEAMS } from '../../services/teamService';

const TeamsContainer = (props) => {
  const { classes } = props;

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
  return (
    <Query query={GET_ALL_TEAMS}>
      {({ loading, error, data}) => {

        if(loading) return <Loader />
        if(error) return <p>Error: {error}</p>

        const { allTeams } = data;
        const teams = allTeams.map(team => ({
          id: team.id,
          letter: team.name.charAt(0).toUpperCase(),
        }))

        if(allTeams) {
          return (
            <List>
              {teams.map(renderTeam)}
            </List>
          )
        }else {
          return (
            <p>Nothing to show</p>
          )
        }


      }}
    </Query>
  )
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
