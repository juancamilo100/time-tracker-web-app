import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface InvoiceDeliveryPageState {
  readonly default: any;
  deliverInvoiceFailed: boolean;
}

/* --- ACTIONS --- */
type InvoiceDeliveryActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = InvoiceDeliveryPageState;
type ContainerActions = InvoiceDeliveryActions;

export { RootState, ContainerState, ContainerActions };
