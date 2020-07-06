import { ContainerState, ContainerActions } from './types';
import ActionTypes from './constants';

export const initialState: ContainerState = {
  createReportFailed: false,
  createReportTaskFailed: {
    state: false,
    rowId: undefined
  }
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
      console.log('Faied to create report task');
      return {
        ...state,
        createReportTaskFailed: {
            state: true,
            rowId: action['payload'].rowId
        }
      };
      break;

    case ActionTypes.CLEAR_REPORT_TASK_CREATION_ERROR_ACTION:
      console.log('Clearing error@@@@@@@@@@');
      return {
        ...state,
        createReportTaskFailed: {
            state: false,
            rowId: undefined
        }
      };
      break;

    default:
      return state;
  }
}

export default createReportPageReducer;
