/*
 *
 * Profile
 *
 */

import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { makeSelectChangingPassword, makeSelectChangePasswordFailed } from './selectors';
import reducer from './reducer';
import { RootState } from './types';
import saga from './saga';
import ProfileAvatar from '../../components/ProfileAvatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import LockIcon from '@material-ui/icons/Lock';
import CloseIcon from '@material-ui/icons/Close';
import ChangePasswordModal from 'components/ChangePasswordModal';
import {
  withStyles,
  WithStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import { Employee } from '../App/types.d';
import { changePasswordAction, clearChangePasswordErrorAction } from './actions';
import { useAlert } from 'react-alert';

interface StateProps {
    changePasswordFailed: boolean;
    changingPassword: boolean;
}
interface OwnProps {
    employee: Employee
}

interface DispatchProps {
  dispatch: Dispatch;
  clearChangePasswordError(): void;
  onChangePassword(
    oldPassword: string,
    newPassword: string,
    employeeId: number
  ): void;
}

type Props = StateProps & DispatchProps & OwnProps;

const dialogStyles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  });

export interface DialogTitleProps extends WithStyles<typeof dialogStyles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(dialogStyles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    width: '500px',
    display: 'flex',
    justifyContent: 'center'
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

const key = 'profilePage';

export function ProfilePage(props: Props) {
  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });
  const alert = useAlert();

  const [open, setOpen] = useState(false);
  const [isValidInput, setIsValidInput] = useState(false);
  const [passwords, setPasswords] = useState({
      old: '',
      new: ''
  });

  if (props.changePasswordFailed) {
    alert.show('There was a problem changing the password', {
      timeout: 4000,
      type: 'error',
      transition: 'scale'
    });
    props.clearChangePasswordError();
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const changePassword = (props: Props, oldPassword: string, newPassword: string) => {
    props.onChangePassword(oldPassword, newPassword, props.employee.id);
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div className={classes.center}>
      <Card className={classes.card}>
        <CardContent>
          <ProfileAvatar />
          <Typography variant="h4" component="h5">
            Laura Perea
          </Typography>
          <br />
          <Typography component="p">Customer</Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Spectrio
          </Typography>
        </CardContent>
        <br/>
        <CardActions>
          <Button
            onClick={handleClickOpen}
            variant="outlined"
            size="small"
            color="primary"
            startIcon={<LockIcon />}
          >
            Change Password
          </Button>
        </CardActions>
      </Card>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Password Update
        </DialogTitle>
        <DialogContent dividers>
          <ChangePasswordModal
            validInput={(oldPassword, newPassword, confirmNewPassword) => {
              setIsValidInput(
                oldPassword &&
                  oldPassword !== newPassword &&
                  newPassword === confirmNewPassword
              );
            }}
            setPasswords={(oldPass, newPass) => {
                setPasswords({
                    old: oldPass,
                    new: newPass
                })
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            disabled={!isValidInput}
            onClick={() => changePassword(props, passwords.new, passwords.old)}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// Map RootState to your StateProps
const mapStateToProps = createStructuredSelector<RootState, StateProps>({
    changePasswordFailed: makeSelectChangePasswordFailed(),
    changingPassword: makeSelectChangingPassword()
});

// Map Disptach to your DispatchProps
function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps {
  return {
    clearChangePasswordError: () => dispatch(clearChangePasswordErrorAction()),
    onChangePassword: (
        oldPassword: string,
        newPassword: string,
        employeeId: number
      ) => dispatch(changePasswordAction(oldPassword, newPassword, employeeId)),
    dispatch: dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(ProfilePage);
