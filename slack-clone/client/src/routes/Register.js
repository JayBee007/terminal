/* eslint no-useless-escape:0 */
import React from 'react';
import { Mutation, graphql } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';

import { REGISTER, SET_USER, setUserToLocalStorage} from '../services/authService';

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    usernameError: '',
  }

  login = () => {
    this.props.history.push('/')
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

  handleSubmitErrors = (errors) => {
    errors.forEach(error => {
      this.setState(() => ({
        [`${error.path}Error`]: error.message
      }))
    })
  }

  render() {
    const { classes, mutate } = this.props;
    const { emailError, usernameError, passwordError, email, username, password } = this.state;
    return (
      <Mutation mutation={REGISTER}
        update={(cache, {data: { register}}) => {
          const { id, token, errors } = register;
          if(errors && errors.length > 0) {
            this.handleSubmitErrors(errors);
            return;
          }
          mutate({
            variables: {
              id,
              token
            }
          });
          setUserToLocalStorage(id, token);
          this.login();
        }}
      >
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

export default compose(
  withStyles(styles),
  graphql(SET_USER)
)(Register);
