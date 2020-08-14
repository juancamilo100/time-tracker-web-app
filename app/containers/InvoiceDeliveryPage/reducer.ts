/*
 *
 * InvoiceDeliveryPage reducer
 *
 */

import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  deliverInvoiceFailed: false,
  deliveringInvoice: false
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
        console.log("Clearing invoice delivery error");
        
      return {
        ...state,
        deliverInvoiceFailed: false
      };
    case ActionTypes.DELIVERING_INVOICE_ACTION:
        console.log("Delivering!");
        
      return {
        ...state,
        deliveringInvoice: true
      };
    case ActionTypes.DELIVERED_INVOICE_ACTION:
      return {
        ...state,
        deliveringInvoice: false
      };
    default:
      return state;
  }
}

export default invoiceDeliveryReducer;
