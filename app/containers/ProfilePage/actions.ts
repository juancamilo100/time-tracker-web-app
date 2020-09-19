/*
 *
 * Profile actions
 *
 */

import { action } from 'typesafe-actions';
import {} from './types';

import ActionTypes from './constants';

export const defaultAction = () => action(ActionTypes.DEFAULT_ACTION);
export const changePasswordAction = (oldPassword, newPassword, employeeId) =>
  action(ActionTypes.CHANGE_PASSWORD_ACTION, {
    oldPassword,
    newPassword,
    employeeId
  });

export const changePasswordFailedAction = () =>
  action(ActionTypes.CHANGE_PASSWORD_FAILED_ACTION);
export const changingPasswordAction = () =>
  action(ActionTypes.CHANGING_PASSWORD_ACTION);
export const changedPasswordAction = () =>
  action(ActionTypes.CHANGED_PASSWORD_ACTION);
export const clearChangePasswordErrorAction = () =>
    action(ActionTypes.CLEAR_CHANGE_PASSWORD_ERROR_ACTION);
