import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface ProfileState {
  readonly default: any;
}

/* --- ACTIONS --- */
type ProfileActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = ProfileState;
type ContainerActions = ProfileActions;

export { RootState, ContainerState, ContainerActions };
