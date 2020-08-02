import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface InvoiceDeliveryState {
  readonly default: any;
}

/* --- ACTIONS --- */
type InvoiceDeliveryActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = InvoiceDeliveryState;
type ContainerActions = InvoiceDeliveryActions;

export { RootState, ContainerState, ContainerActions };
