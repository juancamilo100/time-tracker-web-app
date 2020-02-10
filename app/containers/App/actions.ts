import { action } from 'typesafe-actions';
// import {} from './types';

import ActionTypes from './constants';

export const authActionSuccess = (auth: boolean, token: string) =>
  action(ActionTypes.AUTH_ACTION_SUCCESS, { auth, token });
