/*
 *
 * LoginPage actions
 *
 */

import { action } from 'typesafe-actions';
import {} from './types';

import ActionTypes from './constants';

export const authActionStart = (email: string, password: string) => {
    return action(
        ActionTypes.AUTH_ACTION_START,
        {
            email,
            password
        }
    )
}

export const authActionError = (payload: any) => {
    return action(
        ActionTypes.AUTH_ACTION_ERROR,
        payload
    )
}

