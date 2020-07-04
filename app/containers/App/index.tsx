import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styles/styled-components';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import GlobalStyle from '../../global-styles';
import { routePath, TIME_TRACKER_API_BASE_URL } from 'config';
import LoginPage from 'containers/LoginPage';
import { JWT_SESSION_STORAGE_NAME } from './constants';
import { Dispatch, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { RootState } from 'containers/App/types';
import { connect } from 'react-redux';
import {
  logout,
  authActionSuccess,
  getEmployeeSuccessAction,
  getEmployeeReportsSuccessAction,
  getEmployeeCustomerSuccessAction,
  setLoadingAction
} from './actions';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import { useInjectSaga } from 'utils/injectSaga';
import saga from './saga';
import { getRequest } from '../../utils/request';
import { Employee } from './types.d';
import { Report } from 'containers/HomePage/types';
import { Customer } from '../HomePage/types.d';
import {
  makeSelectEmployee,
  makeSelectReports,
  makeSelectCustomer,
  makeSelectToken,
  makeSelectAuthenticated,
  makeSelectLoading
} from './selectors';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

interface OwnProps {}
interface StateProps {
  token: string;
  loading: boolean;
  authenticated: boolean;
  employee: Employee;
  reports: Report[];
  customer: Customer;
}

interface DispatchProps {
  onLoadingChange(loading: boolean): void;
  onTokenInvalid(): void;
  onTokenValid(auth: boolean, token: string): void;
  onGetEmployeeReportsSuccess: (employee: Report[]) => void;
  onGetEmployeeCustomerSuccess: (customer: Customer) => void;
  onGetEmployeeProfileSuccess: (employee: Employee) => void;
}

type Props = DispatchProps & OwnProps & StateProps;

const key = 'global';

function App(props: Props) {
  useInjectSaga({ key: key, saga: saga });
  const { token, tokenIsExpired } = validateToken();

  if (!token || tokenIsExpired) {
    props.onTokenInvalid();
  } else {
    props.onTokenValid(true, token);
  }

  useEffect(() => {
    if (props.authenticated) {
      fetchStartupData(props);
    }
  }, [props.authenticated]);

  return (
    <AppWrapper>
      <Helmet titleTemplate="%s - Time Tracker" defaultTitle="Time Tracker">
        <meta name="description" content="Time Tracker Application" />
      </Helmet>
      {props.loading ? null : (
        <Switch>
          <Route path={routePath.mainPath} component={HomePage} />
          <Route path={routePath.loginPath} component={LoginPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      )}

      <GlobalStyle />
    </AppWrapper>
  );

  function validateToken() {
    let token = sessionStorage.getItem(JWT_SESSION_STORAGE_NAME);
    let tokenIsExpired = false;

    try {
      const decodedToken = jwt.decode(token!);
      const tokenExpirationDateTimeEpoch = Number.parseInt(
        decodedToken!['exp'],
        10
      );
      const currentDateTimeEpoch = moment().unix();

      tokenIsExpired = currentDateTimeEpoch > tokenExpirationDateTimeEpoch;
    } catch (error) {
      token = null;
      tokenIsExpired = true;
    }

    return { token, tokenIsExpired };
  }
}

function fetchStartupData(props: Props) {
  (async () => {
    props.onLoadingChange(true);
    const decodedToken = jwt.decode(props.token);

    await getReportsData(decodedToken);
    const employeeResponse: Employee = await getEmployeeData(decodedToken);
    await getCustomerData(employeeResponse);

    props.onLoadingChange(false);
  })();

  async function getCustomerData(employeeResponse: Employee) {
    const getCustomerRequestURL = `http://${TIME_TRACKER_API_BASE_URL}/api/customers/${
      employeeResponse.customerId
    }`;
    const customerResponse: Customer = await getRequest(getCustomerRequestURL);
    props.onGetEmployeeCustomerSuccess(customerResponse);
  }

  async function getReportsData(
    decodedToken: string | { [key: string]: any } | null
  ) {
    const getReportsRequestURL = `http://${TIME_TRACKER_API_BASE_URL}/api/employees/${
      decodedToken!['employeeId']
    }/reports`;
    const reportsResponse: Report[] = await getRequest(getReportsRequestURL);
    props.onGetEmployeeReportsSuccess(reportsResponse);
  }

  async function getEmployeeData(
    decodedToken: string | { [key: string]: any } | null
  ) {
    const getEmployeeRequestURL = `http://${TIME_TRACKER_API_BASE_URL}/api/employees/${
      decodedToken!['employeeId']
    }`;
    const employeeResponse: Employee = await getRequest(getEmployeeRequestURL);
    props.onGetEmployeeProfileSuccess(employeeResponse);
    return employeeResponse;
  }
}

export function mapDispatchToProps(
  dispatch: Dispatch,
  ownProps: OwnProps
): DispatchProps {
  return {
    onLoadingChange: (loading: boolean) => dispatch(setLoadingAction(loading)),
    onTokenInvalid: () => dispatch(logout()),
    onTokenValid: (auth: boolean, token: string) =>
      dispatch(authActionSuccess(auth, token)),
    onGetEmployeeReportsSuccess: (reports: Report[]) =>
      dispatch(getEmployeeReportsSuccessAction(reports)),
    onGetEmployeeCustomerSuccess: (customer: Customer) =>
      dispatch(getEmployeeCustomerSuccessAction(customer)),
    onGetEmployeeProfileSuccess: (employee: Employee) =>
      dispatch(getEmployeeSuccessAction(employee))
  };
}

const mapStateToProps = createStructuredSelector<RootState, StateProps>({
  token: makeSelectToken(),
  loading: makeSelectLoading(),
  authenticated: makeSelectAuthenticated(),
  employee: makeSelectEmployee(),
  reports: makeSelectReports(),
  customer: makeSelectCustomer()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(App);
