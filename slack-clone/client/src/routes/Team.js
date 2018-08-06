import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';

import { CREATE_TEAM } from '../services/teamService';

class Team extends React.Component {
  state = {
    team: '',
    teamError: ''
  }

  handleSubmitErrors = (errors) => {
    errors.forEach(error => {
      this.setState(() => ({
        teamError: error.message
      }))
    })
  }

  handleOnChange = (e) => {
    const { id, value } = e.target;

    if(value.length < 6 ) {
      this.setState(() => ({
        [`${id}Error`]: 'team name must be minimum 6 characters'
      }))
      return;
    }
    this.setState(() => ({
      [id]: value,
      [`${id}Error`]: ''
    }));
  }

  render() {
    const { classes } = this.props;
    const { team, teamError } = this.state;
    return(
      <Mutation mutation={CREATE_TEAM}
        update={(_, { data: { createTeam }}) => {
          const { errors } = createTeam;
          if(errors && errors.length > 0) {
            this.handleSubmitErrors(errors);
            return;
          }
        }}
      >
        {(createTeam) => (
          <Grid container className={classes.container} justify="center">
          <Grid item xs={10} sm={6} md={3}>
            <Card className={classes.root}>
              <Typography variant="headline" align="center">Create Team</Typography>
              <form
                autoComplete="off"
                onSubmit={e => {
                  e.preventDefault();
                  if(team.length < 6) return;
                  createTeam({
                    variables: {
                      name: team
                    }
                  })
                }}
              >
                <TextField
                  error={teamError.length > 0}
                  fullWidth
                  type="text"
                  id="team"
                  label="Team Name"
                  margin="normal"
                  required
                  helperText={teamError}
                  onChange={this.handleOnChange}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Create Team
                  <Icon className={classes.icon}>send</Icon>
                </Button>
              </form>
            </Card>
          </Grid>
        </Grid>

        )}
      </Mutation>
    )
  }
}

const styles = {
  root: {
    padding: '1.6rem'
  },
  container: {
    height: '100vh',
    paddingTop: '6rem'
  },
  icon: {
    marginLeft: '1rem'
  }
}

export default withStyles(styles)(Team);
