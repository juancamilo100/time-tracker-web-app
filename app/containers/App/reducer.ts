import { ContainerState, ContainerActions } from './types';
import ActionTypes from './constants';

// The initial state of the App
export const initialState: ContainerState = {
  loading: false,
  error: false,
  currentUser: '',
  authenticated: false,
  token: '',
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function appReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
    console.log("Calling APP reducer with action: ");
    console.log(action);
  switch (action.type) {
      
    case ActionTypes.AUTH_ACTION_SUCCESS:
        console.log("Successfully authenticated!");
        console.log(action.payload);
        return {
            ...state, 
            authenticated: action.payload.auth,
            token: action.payload.token
        };
    case ActionTypes.LOGOUT:
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
