import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';
import { Report } from 'containers/HomePage/types';
import { Customer } from '../HomePage/types.d';

export interface Employee {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    jobTitle: string,
    customerId: number,
    employeeRate: number,
    role: string,
}

/* --- STATE --- */
interface AppState {
  readonly loading: boolean;
  readonly error: object | boolean;
  readonly authenticated: boolean;
  readonly authFailed: boolean;
  readonly token: string;
  readonly employee: Employee;
  readonly reports: Report[];
  readonly customer: Customer;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = AppState;
type ContainerActions = AppActions;

export { RootState, ContainerState, ContainerActions };
