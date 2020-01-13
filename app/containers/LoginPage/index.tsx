/*
 *
 * LoginPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeStyles } from '@material-ui/core/styles';
import img from './loginPic.jpg';
import LoginForm from '../../components/LoginForm';
import H1 from '../../components/H1';
const useStyles = makeStyles({
  center: {
    // display: 'flex',
    alignItems: 'left',
    justifyContent: 'left',
  },
  container: {
    display: 'flex',
  },
  rightItem: {
    position: 'absolute',
    right: '0px',
    paddingRight: '13%',
    paddingTop: '20%'
  },
  field: {
    padding: '2px',
    width: 200,
    fontSize: 14,
  },
  left: {
    position: "relative",
    left: '0px',
    width: '60%',
    height: "auto"
  },
  orangeColor: {
    color: 'orange',
  },
});

interface OwnProps {}

interface StateProps {}

interface DispatchProps {
  dispatch: Dispatch;
}

type Props = StateProps & DispatchProps & OwnProps;

export function LoginPage(props: Props) {
  useInjectReducer({ key: 'loginPage', reducer: reducer });
  useInjectSaga({ key: 'loginPage', saga: saga });
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>
        <img src={img} className={classes.left} />
      </div>

      <div className={classes.rightItem}>
        <H1>Welcome.</H1>
        <LoginForm />
      </div>
    </div>
  );
}

// Map RootState to your StateProps
const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  loginPage: makeSelectLoginPage(),
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

export default compose(withConnect)(LoginPage);
