import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles'

const TeamsContainer = (props) => {
  const { teams, classes } = props;

  const renderTeam = ({id, letter}) => (
    <ListItem key={`team-${id}`} button className={classes.item}>
      <ListItemText primary={letter} classes={{
        primary: classes.text,
        root: classes.root,
      }} />
    </ListItem>
  )
  return (
    <List>
      {teams.map(renderTeam)}
    </List>
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


// const TeamListItem = styled.li`
//   height: 50px;
//   width: 50px;
//   background-color: #676066;
//   color: #fff;
//   margin: auto;
//   margin-bottom: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 24px;
//   border-radius: 11px;
//   &:hover {
//     border-style: solid;
//     border-width: thick;
//     border-color: #767676;
//   }
// `;
