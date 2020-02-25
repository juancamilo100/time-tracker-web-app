import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styles/styled-components';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import GlobalStyle from '../../global-styles';
import { routePath } from 'config';
import LoginPage from 'containers/LoginPage';
import { JWT_SESSION_STORAGE_NAME } from './constants';
import { Dispatch, compose } from 'redux';
import { logout } from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { RootState } from 'containers/App/types';
import { connect } from 'react-redux';
import { authActionSuccess } from './actions';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

interface OwnProps {}
interface StateProps {}

interface DispatchProps {
  onTokenInvalid(): void;
  onTokenValid(auth: boolean, token: string): void;
}

type Props = DispatchProps & OwnProps & StateProps;

function App(props: Props) {
  const { token, tokenIsExpired } = validateToken();

  if (!token || tokenIsExpired) {
    props.onTokenInvalid();
  } else {
    props.onTokenValid(true, token);
  }

  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - Time Tracker" defaultTitle="Time Tracker">
        <meta name="description" content="Time Tracker Application" />
      </Helmet>
      <Switch>
        <Route path={routePath.mainPath} component={HomePage} />
        <Route path={routePath.loginPath} component={LoginPage} />
        <Route path="/" component={HomePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </AppWrapper>
  );

  function validateToken() {
    let token = sessionStorage.getItem(JWT_SESSION_STORAGE_NAME);
    let tokenIsExpired = false;

    try {
      const decodedToken = jwt.decode(token!);
      const tokenExpirationDateTimeEpoch = Number.parseInt(decodedToken!['exp'], 10);
      const currentDateTimeEpoch = moment().unix();

      tokenIsExpired = currentDateTimeEpoch > tokenExpirationDateTimeEpoch;
    } catch (error) {
      token = null;
      tokenIsExpired = true;
    }

    return { token, tokenIsExpired };
  }
}

export function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps {
  return {
    onTokenInvalid: () => dispatch(logout()),
    onTokenValid: (auth: boolean, token: string) =>
      dispatch(authActionSuccess(auth, token)),
  };
}

const mapStateToProps = createStructuredSelector<RootState, StateProps>({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
