import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface LoginPageState {
  readonly default: any;
  readonly authenticated: boolean;
  readonly token: string;
}

/* --- ACTIONS --- */
type LoginPageActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = LoginPageState;
type ContainerActions = LoginPageActions;

export { RootState, ContainerState, ContainerActions };
