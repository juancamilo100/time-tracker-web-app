import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

export interface Customer {
    id: number,
    name: string,
}

export interface Task {

}

export interface Report {
    id: number
    startDate: string,
    endDate: string,
    submitted: boolean,
    tasks: Task[]
}
/* --- STATE --- */

interface HomeState {
  readonly drawerOpen: boolean;
  readonly reports: Report[];
  readonly customer: Customer;
}

/* --- ACTIONS --- */
type AppActions = ActionType<typeof actions>;


/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = HomeState;
type ContainerActions = AppActions;

export { RootState, ContainerState, ContainerActions };
