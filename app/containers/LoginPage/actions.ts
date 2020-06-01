import { action } from 'typesafe-actions';
import ActionTypes from './constants';

export const authActionStart = (email: string, password: string) => {
    return action(
        ActionTypes.AUTH_ACTION_START,
        {
            email,
            password,
        },
    );
};
