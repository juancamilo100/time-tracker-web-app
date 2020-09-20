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

const selectProfilePageDomain = (state: ApplicationRootState) => {
    return state.profilePage || initialState;
};

export const makeSelectChangePasswordFailed = () =>
  createSelector(
    selectProfilePageDomain,
    profile => {
      return profile.changePasswordFailed;
    }
  );
export const makeSelectChangingPassword = () =>
  createSelector(
    selectProfilePageDomain,
    profile => {
      return profile.changingPassword;
    }
  );

export default selectProfile;
export { selectProfileDomain };
