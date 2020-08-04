/*
 *
 * InvoiceDeliveryPage reducer
 *
 */

import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  default: null,
  deliverInvoiceFailed: false
};

function invoiceDeliveryReducer(
  state: ContainerState = initialState,
  action: ContainerActions
): ContainerState {
  switch (action.type) {
    case ActionTypes.DEFAULT_ACTION:
      return state;
    case ActionTypes.DELIVER_INVOICE_FAILED_ACTION:
      return {
        ...state,
        deliverInvoiceFailed: true
      };
    case ActionTypes.CLEAR_DELIVER_INVOICE_ERROR_ACTION:
      return {
        ...state,
        deliverInvoiceFailed: false
      };
    default:
      return state;
  }
}

export default invoiceDeliveryReducer;
