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
import img from './loginPic.jpg';
import LoginForm from '../../components/LoginForm';
import H1 from '../../components/H1';
import { useStyles } from './styles';
import { authActionStart } from './actions';

interface OwnProps {}
interface StateProps {}
interface DispatchProps {
    onAuthenticate: (email: string, password: string) => void;
    dispatch: Dispatch;
}

type Props = StateProps & DispatchProps & OwnProps;

const key = 'home';

export function LoginPage(props: Props) {
  useInjectReducer({ key: key, reducer: reducer });
  useInjectSaga({ key: key, saga: saga });
  const classes = useStyles();
    console.log("Rendering Login Page");
    
  return (
    <div className={classes.container}>
      <div className={classes.leftItem}>
        <H1>Welcome</H1>
        <H1>to Lulosoft <span className={classes.orangeColor}>.</span> </H1>
        <div className={classes.text}>
            <span className={classes.orangeColor}>Hi There!</span> Sing In below to continue
        </div>
        
        <LoginForm onAuthenticate={props.onAuthenticate} />
      </div>
      <div>
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
  dispatch: Dispatch
): DispatchProps {
  return {
    onAuthenticate: (email: string, password: string) => dispatch(authActionStart(email, password)),
    dispatch: dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
