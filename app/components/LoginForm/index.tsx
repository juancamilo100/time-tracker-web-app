import React, { useState, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { useStyles } from './styles';

const GreenCheckbox = withStyles({
  root: {
    color: '#a8acb1',
    '&$checked': {
      color: '#ee8133',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface OwnProps {
  onAuthenticate(email: string, password: string): void;
  username?: string;
  password?: string;
  authFailed: boolean;
}

type Props = OwnProps;

function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();
  return (
    <div>
      <Grid>
        <TextField
          className={classes.field}
          id="standard-required"
          type="email"
          label="Username"
          onChange={useCallback(event => {
            setUsername(event.target.value);
          }, [])}
        />
      </Grid>
      <Grid>
        <TextField
          className={classes.field}
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={useCallback(event => {
            setPassword(event.target.value);
          }, [])}
        />
        {props.authFailed ? (
          <div className={classes.authError}>
            Invalid username and/or password
          </div>
        ) : null}
      </Grid>
      <Grid className={classes.grid}>
        <span className={classes.coloredText}>Forgot your password? </span>
      </Grid>

      <Grid className={classes.checkbox}>
        <FormControlLabel
          control={<GreenCheckbox />}
          label={<span className={classes.text}> Remember me </span>}
        />
      </Grid>

      <div className={classes.center}>
        <Button
          className={[classes.btn, classes.orangeButton].join(' ')}
          onClick={useCallback(
            () => props.onAuthenticate(username, password),
            [username, password],
          )}
        >
          SIGN IN
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
