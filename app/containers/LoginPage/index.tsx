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
import { RootState } from './types';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import { makeStyles } from '@material-ui/core/styles';
import img from './loginPic.jpg';
import LoginForm from '../../components/LoginForm';
import H1 from '../../components/H1';
const useStyles = makeStyles({
  center: {
    alignItems: 'left',
    justifyContent: 'left',
  },
  container: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '20px',
    marginRight: '80px'
  },
  leftItem: {
    paddingRight: '70px',
  },
  field: {
    padding: '2px',
    width: 200,
    fontSize: 12,
  },
  left: {
    // position: "relative",
    // left: '0px',
    // width: '50%',
    // height: 'auto',
  },
  circleImage:{
    objectFit: 'cover',
    borderRadius: '50%',
    width: '450px',
    height: '450px',
  },
  orangeColoredCircle: {
    marginLeft: '50px',
    position:'absolute',
    width: '70px',
    height: '70px',
    backgroundColor: '#ee8133',
    borderRadius: '50%',
    display: 'inline-block',
    boxShadow: '10px -10px #CCC'
  },
  orangeDot: {
    marginTop: '35px',
    marginLeft: '3px',
    position:'absolute',
    width: '13px',
    height: '13px',
    backgroundColor: '#ee8133',
    borderRadius: '50%',
  },
  greenColoredCircle: {
    marginLeft: '-90px',
    marginBottom:'-200px',
    position: 'relative',
    width: '95px',
    height: '95px',
    backgroundColor: '#93d50f',
    borderRadius: '50%',
    display: 'inline-block',
    boxShadow: '10px -10px #CCC'
  },
  orangeColor: {
    fontWeight: 'bold',
    color: '#ee8133',
  },
  text:{
    paddingTop:'20px',
    paddingBottom:'30px'
  }
});

interface OwnProps {}

interface StateProps {}

interface DispatchProps {
  dispatch: Dispatch;
}

type Props = StateProps & DispatchProps & OwnProps;

const key = 'home';

export function LoginPage(props: Props) {
  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.leftItem}>
        <H1>Welcome</H1>
        <H1>to Lulosoft <span className={classes.orangeColor}>.</span> </H1>
        <div className={classes.text}>
        <text ><span className={classes.orangeColor}>Hi There!</span> Sing In below to continue</text>
        </div>
        
        <LoginForm />
      </div>
      <div className={classes.left}>
        <span className={classes.orangeColoredCircle}></span>
        <img src={img} className={classes.circleImage} />
        <span className={classes.greenColoredCircle}></span>
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
