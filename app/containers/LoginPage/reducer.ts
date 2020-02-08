/*
 *
 * LoginPage reducer
 *
 */

import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  default: null,
  authenticated: false
};

function loginPageReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.DEFAULT_ACTION:
      return state;
    case ActionTypes.AUTH_ACTION:
        console.log("Got auth action!");
        console.log(action.payload);
      return {
          ...state, ...action.payload};
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
