/*
 *
 * Profile reducer
 *
 */

import ActionTypes from './constants';
import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
  default: null,
};

function profileReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
    case ActionTypes.DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default profileReducer;

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
