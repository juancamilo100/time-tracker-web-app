import { ApplicationRootState } from 'types';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPage = (state: ApplicationRootState) => {
  return state.loginPage || initialState;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */
export default selectLoginPage;
