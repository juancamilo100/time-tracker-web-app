import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface InvoiceDeliveryPageState {
  readonly deliveringInvoice: boolean;
  readonly deliverInvoiceFailed: boolean;
}

/* --- ACTIONS --- */
type InvoiceDeliveryActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = InvoiceDeliveryPageState;
type ContainerActions = InvoiceDeliveryActions;

export { RootState, ContainerState, ContainerActions };
