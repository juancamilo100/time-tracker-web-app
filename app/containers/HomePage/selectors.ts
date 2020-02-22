/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { ApplicationRootState } from 'types';

const selectHome = (state: ApplicationRootState) => {
  return state.home || initialState;
};

const makeSelectDrawerOpen = () =>
  createSelector(selectHome, substate => {
    return substate.drawerOpen;
  });

export { selectHome, makeSelectDrawerOpen };
