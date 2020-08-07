import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the invoiceDelivery state domain
 */

const selectInvoiceDeliveryPageDomain = (state: ApplicationRootState) => {
  return state.invoiceDeliveryPage || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by InvoiceDeliveryPage
 */

export const makeSelectInvoiceDeliveryFailed = () =>
  createSelector(
    selectInvoiceDeliveryPageDomain,
    invoiceDelivery => {
      return invoiceDelivery.deliverInvoiceFailed;
    }
  );
export const makeSelectDeliveringInvoice = () =>
  createSelector(
    selectInvoiceDeliveryPageDomain,
    invoiceDelivery => {
      return invoiceDelivery.deliveringInvoice;
    }
  );

export { selectInvoiceDeliveryPageDomain };
