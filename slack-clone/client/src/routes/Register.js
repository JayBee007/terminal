import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

const REGISTER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
      email
    }
  }
`;

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  }

  handeOnChange = (e) => {
    const { id, value } = e.target;
    this.setState(() => ({
      [id]: value
    }))
  }

  render() {
    const { classes } = this.props
    return (
      <Mutation mutation={REGISTER} update={({data}) => {console.log(data)}}>
      {(register) => (
        <Grid container className={classes.container} justify="center">
          <Grid item xs={10} sm={6} md={3}>
            <Card className={classes.root}>
              <Typography variant="headline" align="center">Register</Typography>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  register({variables:this.state})
                }}
              >
                <TextField
                  fullWidth
                  id="username"
                  label="Username"
                  margin="normal"
                  required
                  onChange={this.handeOnChange}
                />
                <TextField
                  fullWidth
                  type="email"
                  id="email"
                  label="Email"
                  margin="normal"
                  required
                  onChange={this.handeOnChange}
                />
                <TextField
                  fullWidth
                  type="password"
                  id="password"
                  label="Password"
                  margin="normal"
                  required
                  onChange={this.handeOnChange}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Register
                  <Icon className={classes.icon}>send</Icon>
                </Button>
              </form>
            </Card>
          </Grid>
        </Grid>)
      }
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

export default withStyles(styles)(Register);
