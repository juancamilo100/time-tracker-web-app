import { ApplicationRootState } from 'types';
import { initialState } from './reducer';
import { createSelector } from 'reselect';

/**
 * Direct selector to the loginPage state domain
 */

const selectCreateReportPage = (state: ApplicationRootState) => {
  return state.createReportPage || initialState;
};
const selectGlobal = (state: ApplicationRootState) => {
  return state.global;
};

export const makeSelectCreateReportFailed = () =>
  createSelector(
    selectCreateReportPage,
    createReportState => createReportState.createReportFailed
  );
export const makeSelectReports = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.reports
  );

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */
export { selectCreateReportPage };
