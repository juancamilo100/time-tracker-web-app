import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

const selectReportHistoryPageDomain = (state: ApplicationRootState) => {
  return state.reportHistoryPage || initialState;
};

/**
 * Other specific selectors
 */
export const selectReportHistoryPage = () =>
  createSelector(
    selectReportHistoryPageDomain,
    substate => {
      return substate;
    },
  );

export default selectReportHistoryPage;
