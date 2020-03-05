import { action } from 'typesafe-actions';
// import {} from './types';

import ActionTypes from './constants';
import { Employee } from './types.d';
import { Report } from 'containers/HomePage/types';
import { Customer } from '../HomePage/types.d';

export const authActionSuccess = (auth: boolean, token: string) =>
  action(ActionTypes.AUTH_ACTION_SUCCESS, { auth: auth, token: token });

  export const setLoadingAction = (loading: boolean) =>
  action(ActionTypes.LOADING_ACTION, { loading });

export const getEmployeeSuccessAction = (employee: Employee) =>
  action(ActionTypes.GET_EMPLOYEE_PROFILE_SUCCESS, { employee });

export const getEmployeeReportsSuccessAction = (reports: Report[]) =>
  action(ActionTypes.GET_EMPLOYEE_REPORTS_SUCCESS, { reports });

export const getEmployeeCustomerSuccessAction = (customer: Customer) =>
  action(ActionTypes.GET_EMPLOYEE_CUSTOMER_SUCCESS, { customer });

export const authActionError = () => {
  return action(ActionTypes.AUTH_ACTION_ERROR);
};

export const logout = () => action(ActionTypes.LOGOUT);
