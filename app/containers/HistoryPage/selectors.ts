import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the historyPage state domain
 */

const selectHistoryPageDomain = (state: ApplicationRootState) => {
  return state || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by HistoryPage
 */

const selectHistoryPage = () =>
  createSelector(
    selectHistoryPageDomain,
    substate => {
      return substate;
    },
  );

export default selectHistoryPage;
export { selectHistoryPageDomain };
