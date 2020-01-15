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
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';

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
    width: 250,
  },
  left: {
    left: '0px',
    width: '60%',
    height: '60%',
  },
  orangeColor: {
    color: '#ee8133',
  },
  coloredText: {
    fontSize: 'small',
    color: '#ee8133',
  },
  text: {
    fontSize: 'small',
  },
  grid: {
    paddingTop: '15px',
    paddingBottom: '5px',
  },
  checkbox: {
    paddingTop: '5px',
    paddingBottom: '50px',
  },
  btn: {
    border: '1px solid',
    backgroundColor: 'white',
    color: 'black',
    padding: '10px 20px',
    fontSize: '13px',
    cursor: 'pointer',
  },
  orangeButton: {
    background: '#ee8133',
    color: 'white',

    '&:hover': {
      background: '#fafafa',
      borderColor: '#ee8133',
      color: '#ee8133',
    },
  },
});

const GreenCheckbox = withStyles({
  root: {
    color: '#a8acb1',
    '&$checked': {
      color: '#ee8133',
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

interface Props {}

function LoginForm(props: Props) {
  const classes = useStyles();
  return (
    <div>
      <Grid>
        <TextField
          className={classes.field}
          // autoFocus
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
      <Grid className={classes.grid}>
        <text className={classes.coloredText}>Forgot your password? </text>
      </Grid>

      <Grid className={classes.checkbox}>
        <FormControlLabel
          control={<GreenCheckbox />}
          label={<text className={classes.text}> Remember me </text>}
        />
      </Grid>

      <div className={classes.center}>
        <Button
          className={[classes.btn, classes.orangeButton].join(' ')}
          component={Link}
          to={routePath.mainPath}
        >
          SING IN
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
