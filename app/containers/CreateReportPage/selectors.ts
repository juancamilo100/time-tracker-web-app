import { ApplicationRootState } from 'types';
import { initialState } from './reducer';
import { createSelector } from 'reselect';

/**
 * Direct selector to the loginPage state domain
 */

const selectCreateReportPage = (state: ApplicationRootState) => {
  return state.createReportPage || initialState;
};

export const makeSelectCreateReportFailed = () =>
    createSelector(selectCreateReportPage, createReportState => createReportState.createReportFailed);

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */
export { selectCreateReportPage };
