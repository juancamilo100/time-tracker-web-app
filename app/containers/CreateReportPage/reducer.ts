import { ContainerState, ContainerActions } from './types';
import ActionTypes from './constants';

export const initialState: ContainerState = {
    createReportFailed: false
};

function createReportPageReducer(
  state: ContainerState = initialState,
  action: ContainerActions,
): ContainerState {
  switch (action.type) {
      case ActionTypes.CREATE_REPORT_FAILED:
          console.log("Faied to create report");
          return {
              ...state
          }
          break;
          
    default:
      return state;
  }
}

export default createReportPageReducer;

