import React from 'react';
import { Mutation } from 'react-apollo';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import { CREATE_DIRECT_MESSAGE } from '../../services/directMessageService';

class SendDirectMessage extends React.Component {

  state = {
    text: ''
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      text: value
    });
  }

  render() {
    const { classes, receiverId,team, className } = this.props;
    const { text } = this.state;
    return (
      <Mutation
        mutation={CREATE_DIRECT_MESSAGE}
        update={(_, {data: { createDirectMessage }}) => {
          if(createDirectMessage) {
            this.setState({
              text: ''
            })
          }
        }}
      >
        {(createDirectMessage) => {
          return (
            <Grid item className={className}>
              <form
                autoComplete="off"
                onSubmit={e => {
                  e.preventDefault();

                  if(text.length > 0) {
                    createDirectMessage({
                      variables: {
                        receiverId,
                        text,
                        teamId: team.id,
                      }
                    });
                  }
                }}
              >
                <FormControl className={classes.control}>
                  <Input
                    onChange={this.handleChange}
                    classes={{
                      focused:classes.focused
                    }}
                    disableUnderline
                    id="send-message"
                    className={classes.input}
                    placeholder={`Message #${receiverId}`}
                    value={text}
                  />
                </FormControl>
              </form>
            </Grid>
          );
        }}
      </Mutation>
    )
  }
};


const styles = {
  control: {
    width: '100%'
  },
  input: {
    border: '1px solid lightgray',
    borderRadius: 4,
    paddingLeft: '0.5rem',
  },
  focused: {
    borderColor: '#80bdff',
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
  }
}

export default withStyles(styles)(SendDirectMessage);
