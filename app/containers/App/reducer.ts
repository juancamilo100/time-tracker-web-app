import { ContainerState, ContainerActions } from './types';
import ActionTypes, { JWT_SESSION_STORAGE_NAME } from './constants';
import { Employee } from './types.d';
import { Customer } from '../HomePage/types.d';

export const initialState: ContainerState = {
  loading: false,
  error: false,
  authenticated: false,
  authFailed: false,
  token: '',
  employee: {} as Employee,
  employees: [],
  reports: [],
  customer: {} as Customer,
  customers: [],
  reload: false
};

function appReducer(
  state: ContainerState = initialState,
  action: ContainerActions
): ContainerState {
  switch (action.type) {
    case ActionTypes.LOADING_ACTION:
      return {
        ...state,
        loading: action.payload.loading
      };

    case ActionTypes.AUTH_ACTION_SUCCESS:
      sessionStorage.setItem(JWT_SESSION_STORAGE_NAME, action.payload.token);
      return {
        ...state,
        authenticated: action.payload.auth,
        authFailed: false,
        token: action.payload.token
      };

    case ActionTypes.AUTH_ACTION_ERROR:
      return {
        ...state,
        authFailed: true
      };

    case ActionTypes.GET_EMPLOYEE_PROFILE_SUCCESS:
      return {
        ...state,
        employee: action.payload.employee
      };

    case ActionTypes.GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.payload
      };

    case ActionTypes.GET_ADMIN_REPORTS_SUCCESS:
      return {
        ...state,
        reports: action.payload.reports
      };

    case ActionTypes.GET_EMPLOYEE_REPORTS_SUCCESS:
      return {
        ...state,
        reports: action.payload.reports
      };

    case ActionTypes.GET_EMPLOYEE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customer: action.payload.customer
      };

    case ActionTypes.GET_ALL_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: action.payload
      };

    case ActionTypes.CREATE_REPORT_SUCCESS:
      const newReports = [...state.reports, action.payload.report];

      return {
        ...state,
        reports: newReports
      };

    case ActionTypes.CREATE_REPORT_TASK_SUCCESS:
      let newReload = !state.reload;
      return {
        ...state,
        reload: newReload
      };

    case ActionTypes.UPDATE_REPORT_TASK_SUCCESS:
      newReload = !state.reload;
      return {
        ...state,
        reload: newReload
      };

    case ActionTypes.DELETE_REPORT_TASK_SUCCESS:
      newReload = !state.reload;
      return {
        ...state,
        reload: newReload
      };

    case ActionTypes.SUBMIT_REPORT_SUCCESS:
      const updatedReports = state.reports.map(report => {
        if (report.id === action.payload.reportId) {
          report.submitted = true;
        }
        return report;
      });

      return {
        ...state,
        reports: [...updatedReports]
      };

    case ActionTypes.LOGOUT:
      sessionStorage.removeItem(JWT_SESSION_STORAGE_NAME);
      return {
        ...state,
        authenticated: false,
        authFailed: false,
        token: ''
      };

    default:
      return state;
  }
}

export default appReducer;
