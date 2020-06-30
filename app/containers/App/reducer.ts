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
  reports: [],
  customer: {} as Customer
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

    case ActionTypes.CREATE_REPORT_SUCCESS:
        console.log("Report created successfully");
        
        const newReports = { ...state.reports }
        newReports.push(action.payload.report);

      return {
        ...state,
        reports: newReports
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
