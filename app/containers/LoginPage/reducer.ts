import { ContainerState, ContainerActions } from './types';

export const initialState: ContainerState = {
    authFailed: false,
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

