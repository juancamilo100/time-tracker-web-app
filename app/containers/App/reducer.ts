import { ContainerState, ContainerActions } from './types';
import ActionTypes, { JWT_SESSION_STORAGE_NAME } from './constants';

export const initialState: ContainerState = {
  loading: false,
  error: false,
  authenticated: false,
  authFailed: false,
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
        authFailed: false,
        token: action.payload.token,
      };
    case ActionTypes.AUTH_ACTION_ERROR:
      return {
        ...state,
        authFailed: true,
      };
    case ActionTypes.LOGOUT:
      sessionStorage.removeItem(JWT_SESSION_STORAGE_NAME);
      return {
        ...state,
        authenticated: false,
        authFailed: false,
        token: '',
      };
    default:
      return state;
  }
}

export default appReducer;
