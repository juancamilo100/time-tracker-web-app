/*
 *
 * Profile
 *
 */

import React, { memo } from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface StateProps {}
interface OwnProps {}

interface DispatchProps {
  dispatch: Dispatch;
}

type Props = StateProps & DispatchProps & OwnProps;

const key = 'profilePage';

export function ProfilePage(props: Props) {
  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });

  const classes = useStyles();

  return (
    <div className={classes.center}>
      {/* <FormattedMessage {...messages.header} /> */}
      <Card className={classes.card}>
      <CardContent >
        <ProfileAvatar/>
        <Typography variant="h4" component="h5">
          Laura Perea
        </Typography>
        <Typography component="p">Employee Since</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          April 2016
        </Typography>
        <Typography  component="p">Project</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Spectrio
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" size="small">Change Password</Button>
      </CardActions>
    </Card>
    </div>
  );
}

// Map RootState to your StateProps
const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  profile: makeSelectProfile(),
});

// Map Disptach to your DispatchProps
function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps {
  return {
    dispatch: dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default  compose(withConnect, memo)(ProfilePage);
