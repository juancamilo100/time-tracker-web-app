/*
 *
 * LoginPage reducer
 *
 */

// import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';
// import ActionTypes from './constants';

export const initialState: ContainerState = {
};

function loginPageReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    // case ActionTypes.AUTH_ACTION_SUCCESS:
    //     console.log("Successfully authenticated!");
    //     console.log(action.payload);
    //     return {
    //         ...state, 
    //         authenticated: action.payload.auth,
    //         token: action.payload.token
    //     };
    default:
      return state;
  }
}

export default loginPageReducer;

// import { combineReducers } from 'redux';


// export default combineReducers<ContainerState, ContainerActions>({
//   default: (state = initialState, action) => {
//     switch (action.type) {
//       case ActionTypes.DEFAULT_ACTION:
//         return 'state';
//       default:
//         return state;
//     }
//   },
// });
