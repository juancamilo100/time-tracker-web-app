import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface HistoryPageState {
  readonly default: any;
}

/* --- ACTIONS --- */
type HistoryActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = HistoryPageState;
type ContainerActions = HistoryActions;

export { RootState, ContainerState, ContainerActions };
