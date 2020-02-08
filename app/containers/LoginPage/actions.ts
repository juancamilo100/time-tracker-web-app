/*
 *
 * LoginPage actions
 *
 */

import { action } from 'typesafe-actions';
import {} from './types';

import ActionTypes from './constants';

export const defaultAction = () => action(ActionTypes.DEFAULT_ACTION);
export const authAction = (email: string, password: string) => {
    return action(
        ActionTypes.AUTH_ACTION,
        {
            email,
            password
        }
    )
}
