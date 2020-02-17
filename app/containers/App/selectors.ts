/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';

const selectGlobal = (state: ApplicationRootState) => {
  return state.global;
};

const selectRoute = (state: ApplicationRootState) => {
  return state.router;
};

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.loading);

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.error);

const makeSelectAuthenticated = () =>
  createSelector(selectGlobal, globalState => globalState.authenticated);

const makeSelectAuthFailed = () =>
  createSelector(selectGlobal, globalState => globalState.authFailed);

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.location);

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectAuthenticated,
  makeSelectAuthFailed,
  makeSelectLocation,
};
