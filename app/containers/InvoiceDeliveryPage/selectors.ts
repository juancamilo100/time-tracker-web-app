import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the invoiceDelivery state domain
 */

const selectInvoiceDeliveryPageDomain = (state: ApplicationRootState) => {
  return state || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by InvoiceDeliveryPage
 */

const selectInvoiceDelivery = () =>
  createSelector(
    selectInvoiceDeliveryPageDomain,
    substate => {
      return substate;
    }
  );

export default selectInvoiceDelivery;
export { selectInvoiceDeliveryPageDomain };
