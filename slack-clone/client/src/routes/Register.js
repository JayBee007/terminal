/* eslint no-useless-escape:0 */
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
    emailError: '',
    passwordError: '',
    usernameError: '',
  }

  handeOnChange = (e) => {
    const { id, value } = e.target;

    switch(id) {
      case 'email':
        const regex = /^([A-Za-z0-9_\-\.]){1,}\@([A-Za-z]){1,}\.([a-z]{2,4})$/
        if (!regex.test(value)) {
          this.setState(() => ({
            [`${id}Error`]: 'invalid e-mail'
          }))
          return;
        }
        break;
      case 'username':
        if (value.length < 3) {
          this.setState(() => ({
            [`${id}Error`]: 'invalid username'
          }))
          return
        }
        break;
      case 'password':
        if (value.length < 6) {
          this.setState(() => ({
            [`${id}Error`]: 'password must be minimum 6 characters'
          }))
          return
        }
        break;
      default:
        break;
    }
    this.setState(() => ({
      [id]: value,
      [`${id}Error`]: ''
    }))
  }

  render() {
    const { classes } = this.props;
    const { emailError, usernameError, passwordError, email, username, password } = this.state;
    return (
      <Mutation mutation={REGISTER} update={({data}) => {console.log(data)}}>
      {(register) => (
        <Grid container className={classes.container} justify="center">
          <Grid item xs={10} sm={6} md={3}>
            <Card className={classes.root}>
              <Typography variant="headline" align="center">Register</Typography>
              <form
                autoComplete="off"
                onSubmit={e => {
                  e.preventDefault();
                  register({variables:{
                    username,
                    email,
                    password
                  }})
                }}
              >
                <TextField
                  error={usernameError.length > 0}
                  fullWidth
                  id="username"
                  label="Username"
                  margin="normal"
                  required
                  helperText={usernameError}
                  onChange={this.handeOnChange}
                />
                <TextField
                  error={emailError.length > 0}
                  fullWidth
                  type="email"
                  id="email"
                  label="Email"
                  margin="normal"
                  required
                  helperText={emailError}
                  onChange={this.handeOnChange}
                />
                <TextField
                  error={passwordError.length > 0}
                  fullWidth
                  type="password"
                  id="password"
                  label="Password"
                  margin="normal"
                  required
                  helperText={passwordError}
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
