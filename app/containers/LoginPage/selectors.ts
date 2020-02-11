import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = (state: ApplicationRootState) => {
  return state || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

const selectAuthenticated = () =>
createSelector(
  selectLoginPageDomain,
  substate => {
    return substate.global.authenticated;
  },
);

// const selectLoginPage = () =>
//   createSelector(
//     selectLoginPageDomain,
//     substate => {
//       return substate;
//     },
//   );

export default selectAuthenticated;
export { selectLoginPageDomain };
