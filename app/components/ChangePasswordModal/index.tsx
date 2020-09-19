/**
 *
 * ChangePasswordModal
 *
 */
import React, { memo } from 'react';
import { useStyles } from './styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';

interface Props {
  validInput: (oldPassword, newPassword, confirmNewPassword) => void;
  setPasswords: (oldPassword, newPassword) => void;
}
interface State {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  showPassword: boolean;
}

const invalidNewPassword = (oldPassword, newPassword) => {
    if(oldPassword && newPassword) {
        return oldPassword === newPassword;
    }
    return false;
}

const invalidPasswordMatch = (newPassword, passwordConfirmation) => {
    if(newPassword && passwordConfirmation) {
        return newPassword !== passwordConfirmation;
    }
    return false;
}

function ChangePasswordModal(props: Props) {
  const classes = useStyles();

  const [values, setValues] = React.useState<State>({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    showPassword: false
  });
  
  if (values.oldPassword && values.newPassword && values.confirmNewPassword) {
    props.validInput(
      values.oldPassword,
      values.newPassword,
      values.confirmNewPassword
    );
  }

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
      props.setPasswords(
          values.oldPassword,
          values.newPassword
      )   
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <FormControl className={clsx(classes.margin, classes.textField)}>
        <InputLabel htmlFor="standard-adornment-password">
          Old Password
        </InputLabel>
        <Input
          id="standard-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.oldPassword}
          onChange={handleChange('oldPassword')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl className={clsx(classes.margin, classes.textField)}>
        <InputLabel htmlFor="standard-adornment-password">
          New Password
        </InputLabel>
        <Input
          id="standard-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.newPassword}
          onChange={handleChange('newPassword')}
          error={invalidNewPassword(values.oldPassword, values.newPassword)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl className={clsx(classes.margin, classes.textField)}>
        <InputLabel htmlFor="standard-adornment-password">
          Confirm New Password
        </InputLabel>
        <Input
          id="standard-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.confirmNewPassword}
          onChange={handleChange('confirmNewPassword')}
          error={invalidPasswordMatch(values.newPassword, values.confirmNewPassword)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
}

export default memo(ChangePasswordModal);
