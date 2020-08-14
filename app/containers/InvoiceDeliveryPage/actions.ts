/*
 *
 * InvoiceDeliveryPage actions
 *
 */

import { action } from 'typesafe-actions';
import {} from './types';

import ActionTypes from './constants';

export const defaultAction = () => action(ActionTypes.DEFAULT_ACTION);
export const deliverInvoiceAction = (
  customerId: string,
  startDate: Date,
  endDate: Date,
  reportIds: number[]
) =>
  action(ActionTypes.DELIVER_INVOICE_ACTION, {
    customerId,
    startDate,
    endDate,
    reportIds
  });

export const deliverInvoiceFailedAction = () =>
  action(ActionTypes.DELIVER_INVOICE_FAILED_ACTION);
export const deliveringInvoiceAction = () =>
  action(ActionTypes.DELIVERING_INVOICE_ACTION);
export const deliveredInvoiceAction = () =>
  action(ActionTypes.DELIVERED_INVOICE_ACTION);

export const clearDeliverInvoiceErrorAction = () =>
  action(ActionTypes.CLEAR_DELIVER_INVOICE_ERROR_ACTION);
