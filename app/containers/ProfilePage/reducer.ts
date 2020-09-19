/*
 *
 * Profile reducer
 *
 */

import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  default: null,
  changePasswordFailed: false,
  changingPassword: false
};

function profileReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.DEFAULT_ACTION:
      return state;
    case ActionTypes.CHANGE_PASSWORD_FAILED_ACTION:
        return {
            ...state,
            changePasswordFailed: true
        };
    case ActionTypes.CLEAR_CHANGE_PASSWORD_ERROR_ACTION:
        return {
            ...state,
            changePasswordFailed: false,
            changingPassword: false
        };
    case ActionTypes.CHANGING_PASSWORD_ACTION:
        return {
            ...state,
            changingPassword: true
        };
    case ActionTypes.CHANGED_PASSWORD_ACTION:
        return {
            ...state,
            changingPassword: false
        };
    default:
      return state;
  }
}

export default profileReducer;

