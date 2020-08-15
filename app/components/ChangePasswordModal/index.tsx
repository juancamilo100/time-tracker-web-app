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

interface Props {}
interface State {
  oldPassword: string;
  newPassword: string;
  showPassword: boolean;
}

function ChangePasswordModal(props: Props) {
  const classes = useStyles();

  const [values, setValues] = React.useState<State>({
    oldPassword: '',
    newPassword: '',
    showPassword: false
  });

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
