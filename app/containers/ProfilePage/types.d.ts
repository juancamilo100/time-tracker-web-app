import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface ProfilePageState {
  readonly default: any;
  readonly changePasswordFailed: boolean;
  readonly changingPassword: boolean;
}

/* --- ACTIONS --- */
type ProfileActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = ProfilePageState;
type ContainerActions = ProfileActions;

export { RootState, ContainerState, ContainerActions };
