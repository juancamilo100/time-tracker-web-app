import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface CreateReportPageActions {
    
}

/* --- ACTIONS --- */
type CreateReportActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = CreateReportPageActions;
type ContainerActions = CreateReportActions;

export { RootState, ContainerState, ContainerActions };
