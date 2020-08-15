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
import makeSelectProfile from './selectors';
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
import Modal from '@material-ui/core/Modal';
import ChangePasswordModal from 'components/ChangePasswordModal';

interface StateProps {}
interface OwnProps {
  isDrawerOpen: boolean;
}

interface DispatchProps {
  dispatch: Dispatch;
}

type Props = StateProps & DispatchProps & OwnProps;

const key = 'profilePage';

export function ProfilePage(props: Props) {
  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });

  console.log('Is drawer open? ');
  console.log(props.isDrawerOpen);

  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const modalBody = (
    <div
      className={props.isDrawerOpen ? classes.modalBody : classes.modalBodyWide}
    >
      <ChangePasswordModal />
    </div>
  );

  return (
    <div className={classes.center}>
      <Card className={classes.card}>
        <CardContent>
          <ProfileAvatar />
          <Typography variant="h4" component="h5">
            Laura Perea
          </Typography>
          <Typography component="p">Employee Since</Typography>
          <Typography component="p">Project</Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Spectrio
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => setOpen(true)} color="primary" size="small">
            Change Password
          </Button>
        </CardActions>
      </Card>
      <Modal
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        {modalBody}
      </Modal>
    </div>
  );
}

// Map RootState to your StateProps
const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  profile: makeSelectProfile()
});

// Map Disptach to your DispatchProps
function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps {
  return {
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
