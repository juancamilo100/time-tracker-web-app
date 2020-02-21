import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import { RootState } from './types';
import reducer from './reducer';
import saga from './saga';
import sideImage from './assets/loginPic.jpg';
import logo from './assets/LogoLettersOnlyTransparent.png';
import LoginForm from '../../components/LoginForm';
import H1 from '../../components/H1';
import { useStyles } from './styles';
import { authActionStart } from './actions';
import {
  makeSelectAuthenticated,
  makeSelectAuthFailed,
} from 'containers/App/selectors';
import { Redirect } from 'react-router-dom';

interface OwnProps {}
interface StateProps {
  authFailed: boolean;
  authenticated: boolean;
}

interface DispatchProps {
  onAuthenticate: (email: string, password: string) => void;
  dispatch: Dispatch;
}

type Props = StateProps & DispatchProps & OwnProps;

const keyLoginPage = 'loginPage';

export function LoginPage(props: Props) {
  console.log('Rendering Login Page:');
  console.log(props);

  useInjectReducer({ key: keyLoginPage, reducer: reducer });
  useInjectSaga({ key: keyLoginPage, saga: saga });

  const classes = useStyles();
  if (props.authenticated) {
    return <Redirect to="/main" />;
  }
  return (
    <div>
      <div className={classes.logoContainer}>
        <img className={classes.logo} src={logo} />
      </div>
      <div className={classes.container}>
        <div className={classes.leftItem}>
          <H1>Welcome</H1>
          <H1>
            to Lulosoft <span className={classes.orangeColor}>.</span>{' '}
          </H1>
          <div className={classes.text}>
            <span className={classes.orangeColor}>Hi There!</span> Sign In below
            to continue
          </div>

          <LoginForm
            onAuthenticate={props.onAuthenticate}
            authFailed={props.authFailed}
          />
        </div>
        <div>
          <span className={classes.orangeColoredCircle} />
          <img src={sideImage} className={classes.circleImage} />
          <span className={classes.greenColoredCircle} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  authenticated: makeSelectAuthenticated(),
  authFailed: makeSelectAuthFailed(),
});

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onAuthenticate: (email: string, password: string) =>
      dispatch(authActionStart(email, password)),
    dispatch: dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
