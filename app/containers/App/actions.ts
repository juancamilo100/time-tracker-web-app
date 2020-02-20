import { action } from 'typesafe-actions';
// import {} from './types';

import ActionTypes from './constants';

export const authActionSuccess = (auth: boolean, token: string) =>
  action(ActionTypes.AUTH_ACTION_SUCCESS, { auth: auth, token: token });

export const authActionError = () => {
    return action(
        ActionTypes.AUTH_ACTION_ERROR,
    );
};
export const logout = () =>
  action(ActionTypes.LOGOUT);
