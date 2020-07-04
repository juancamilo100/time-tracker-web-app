import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface CreateReportPageState {
    createReportFailed: boolean
}

/* --- ACTIONS --- */
type CreateReportActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = CreateReportPageState;
type ContainerActions = CreateReportActions;

export { RootState, ContainerState, ContainerActions };
