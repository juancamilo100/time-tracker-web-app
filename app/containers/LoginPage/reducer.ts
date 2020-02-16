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
    default:
      return state;
  }
}

export default loginPageReducer;

