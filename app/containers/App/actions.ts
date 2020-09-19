import { action } from 'typesafe-actions';
// import {} from './types';

import ActionTypes from './constants';
import { Employee } from './types.d';
import { Report } from 'containers/HomePage/types';
import { Customer } from '../HomePage/types.d';

export const authActionSuccess = (auth: boolean, token: string) =>
  action(ActionTypes.AUTH_ACTION_SUCCESS, { auth: auth, token: token });

export const authActionError = () => action(ActionTypes.AUTH_ACTION_ERROR);

export const setLoadingAction = (loading: boolean) =>
  action(ActionTypes.LOADING_ACTION, { loading });

export const getEmployeeSuccessAction = (employee: Employee) =>
  action(ActionTypes.GET_EMPLOYEE_PROFILE_SUCCESS, { employee });

export const getEmployeesSuccessAction = (employees: Employee[]) =>
  action(ActionTypes.GET_EMPLOYEES_SUCCESS, employees);

export const getEmployeeReportsSuccessAction = (reports: Report[]) =>
  action(ActionTypes.GET_EMPLOYEE_REPORTS_SUCCESS, { reports });

export const getAdminReportsSuccessAction = (reports: Report[]) =>
  action(ActionTypes.GET_ADMIN_REPORTS_SUCCESS, { reports });

export const getEmployeeCustomerSuccessAction = (customer: Customer) =>
  action(ActionTypes.GET_EMPLOYEE_CUSTOMER_SUCCESS, { customer });

export const getAllCustomersSuccessAction = (customers: Customer[]) =>
  action(ActionTypes.GET_ALL_CUSTOMER_SUCCESS, customers);

export const createReportSuccess = (report: Report) =>
  action(ActionTypes.CREATE_REPORT_SUCCESS, { report });

export const createReportTaskSuccess = (report: Report) =>
  action(ActionTypes.CREATE_REPORT_TASK_SUCCESS, { report });

export const updateReportTaskSuccess = (report: Report) =>
  action(ActionTypes.UPDATE_REPORT_TASK_SUCCESS, { report });

export const deleteReportTaskSuccess = () =>
  action(ActionTypes.DELETE_REPORT_TASK_SUCCESS);

export const submitReportSuccess = (reportId: number) =>
  action(ActionTypes.SUBMIT_REPORT_SUCCESS, {
    reportId
  });

export const deliverInvoiceSuccess = () =>
  action(ActionTypes.DELIVER_INVOICE_SUCCESS);

export const changePasswordSuccess = () =>
  action(ActionTypes.CHANGE_PASSWORD_SUCCESS);

export const logout = () => action(ActionTypes.LOGOUT);
