import { ContainerState, ContainerActions } from './types';
import ActionTypes from './constants';

export const initialState: ContainerState = {
  createReportFailed: false,
  createReportTaskFailed: false
};

function createReportPageReducer(
  state: ContainerState = initialState,
  action: ContainerActions
): ContainerState {
  switch (action.type) {
    case ActionTypes.CREATE_REPORT_FAILED_ACTION:
      console.log('Faied to create report');
      return {
        ...state
      };
      break;

    case ActionTypes.CREATE_REPORT_TASK_FAILED_ACTION:
      console.log('Faied to create report');
      return {
        ...state
      };
      break;

    default:
      return state;
  }
}

export default createReportPageReducer;
