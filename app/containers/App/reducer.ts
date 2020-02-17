import { ContainerState, ContainerActions } from './types';
import ActionTypes, { JWT_SESSION_STORAGE_NAME } from './constants';

// The initial state of the App
export const initialState: ContainerState = {
  loading: false,
  error: false,
  currentUser: '',
  authenticated: false,
  token: '',
};

function appReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.AUTH_ACTION_SUCCESS:
        sessionStorage.setItem(JWT_SESSION_STORAGE_NAME, action.payload.token);
        return {
            ...state, 
            authenticated: action.payload.auth,
            token: action.payload.token
        };
    case ActionTypes.LOGOUT:
        sessionStorage.setItem(JWT_SESSION_STORAGE_NAME, '');
        return {
            ...state, 
            authenticated: false,
            token: ""
        };
    default:
      return state;
  }
}

export default appReducer;
