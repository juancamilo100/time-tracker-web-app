/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';

export const selectGlobal = (state: ApplicationRootState) => {
  return state.global;
};

export const selectRoute = (state: ApplicationRootState) => {
  return state.router;
};

export const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.loading);

export const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.error);

export const makeSelectAuthenticated = () =>
  createSelector(selectGlobal, globalState => globalState.authenticated);

export const makeSelectToken = () =>
  createSelector(selectGlobal, globalState => globalState.token);

export const makeSelectEmployee = () =>
  createSelector(selectGlobal, globalState => globalState.employee);

export const makeSelectReports = () =>
  createSelector(selectGlobal, globalState => globalState.reports);

export const makeSelectCustomer = () =>
  createSelector(selectGlobal, globalState => globalState.customer);

export const makeSelectAuthFailed = () =>
  createSelector(selectGlobal, globalState => globalState.authFailed);

export const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.location);
