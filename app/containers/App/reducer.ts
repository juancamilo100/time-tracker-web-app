import { ContainerState, ContainerActions } from './types';
import ActionTypes from './constants';

// The initial state of the App
export const initialState: ContainerState = {
  loading: false,
  error: false,
  currentUser: '',
  authenticated: false,
  token: '',
  userData: {
    repositories: [],
  },
};

// Take this container's state (as a slice of root state), this container's actions and return new state
function appReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.AUTH_ACTION_SUCCESS:
        console.log("Successfully authenticated!");
        console.log(action.payload);
        return {
            ...state, 
            authenticated: action.payload.auth,
            token: action.payload.token
        };
    default:
      return state;
  }
}

export default appReducer;
