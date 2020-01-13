/**
 *
 * LoginForm
 *
 */
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { routePath } from 'config';
const useStyles = makeStyles({
  center: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
  },
  container: {
    display: 'flex',
  },
  rightItem: {
    position: 'absolute',
    right: '0px',
    paddingRight: '10%',
  },
  field: {
    padding: '2px',
    width: 200,
    fontSize: 14,
  },
  left: {
    left: '0px',
    width: '60%',
    height: '60%',
  },
  orangeColor: {
    color: 'orange',
  },
});

interface Props {}

function LoginForm(props: Props) {
  const classes = useStyles();
  return (
    <div>
      <Grid>
        <TextField
          className={classes.field}
          autoFocus
          id="standard-required"
          type="email"
          label="Username"
        />
      </Grid>
      <Grid>
        <TextField
          className={classes.field}
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </Grid>
      <div className={classes.center}>
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          to={routePath.mainPath}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
