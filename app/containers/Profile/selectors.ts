import { createSelector } from 'reselect';
import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the profile state domain
 */

const selectProfileDomain = (state: ApplicationRootState) => {
  return state || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by Profile
 */

const selectProfile = () =>
  createSelector(
    selectProfileDomain,
    substate => {
      return substate;
    },
  );

export default selectProfile;
export { selectProfileDomain };
