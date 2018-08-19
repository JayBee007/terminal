import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const SendMessage = (props) => (
  <Grid item>
    <FormControl className={props.classes.control}>
      <Input
        classes={{
          focused:props.classes.focused
        }}
        disableUnderline
        id="send-message"
        className={props.classes.input}
        placeholder={`Message #${props.channelName}`}
      />
    </FormControl>
  </Grid>
)


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

export default withStyles(styles)(SendMessage);
