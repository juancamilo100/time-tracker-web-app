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

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

interface OwnProps {}
interface StateProps {}

interface DispatchProps {
    onTokenMissing(): void;
    onTokenPresent(auth: boolean, token: string): void;
}

type Props = DispatchProps & OwnProps & StateProps;

function App(props: Props) {
  const token = sessionStorage.getItem(JWT_SESSION_STORAGE_NAME);

  if (!token) {
    props.onTokenMissing();
  } else {
    props.onTokenPresent(true, token);
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
}

export function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps {
  return {
    onTokenMissing: () => dispatch(logout()),
    onTokenPresent: (auth: boolean, token: string) => dispatch(authActionSuccess(auth, token)),
  };
}

const mapStateToProps = createStructuredSelector<RootState, StateProps>({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
