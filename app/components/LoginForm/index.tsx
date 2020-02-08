/**
 *
 * LoginForm
 *
 */
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import { routePath } from 'config';
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

interface StateProps {
}

interface OwnProps {
    onAuthenticate(email: string, password: string): void;
    username?: string;
    password?: string;
}

type Props = OwnProps & StateProps;

function LoginForm(props: Props) {
    const [username, setUsername] = useState("");  
    const [password, setPassword] = useState("");  

  const classes = useStyles();
  return (
    <div>
      <Grid>
        <TextField
          className={classes.field}
          id="standard-required"
          type="email"
          label="Username"
          onChange={(event) => { setUsername(event.target.value) }}
        />
      </Grid>
      <Grid>
        <TextField
          className={classes.field}
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(event) => { setPassword(event.target.value) }}
        />
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
          onClick={() => props.onAuthenticate(username, password)}
        >
          SING IN
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
