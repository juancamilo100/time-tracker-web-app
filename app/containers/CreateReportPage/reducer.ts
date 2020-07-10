import { ContainerState, ContainerActions } from './types';
import ActionTypes from './constants';

export const initialState: ContainerState = {
  createReportFailed: false,
  createReportTaskFailed: {
    state: false,
    rowId: undefined
  },
  updateReportTaskFailed: {
    state: false,
    oldData: {}
  },
  deleteReportTaskFailed: {
    state: false,
    oldData: {}
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

    case ActionTypes.CREATE_REPORT_TASK_FAILED_ACTION:
      console.log('Faied to create report task');
      return {
        ...state,
        createReportTaskFailed: {
          state: true,
          rowId: action['payload'].rowId
        }
      };

    case ActionTypes.UPDATE_REPORT_TASK_FAILED_ACTION:
      console.log('Faied to update report task');
      return {
        ...state,
        updateReportTaskFailed: {
          state: true,
          oldData: action['payload'].oldData
        }
      };

    case ActionTypes.DELETE_REPORT_TASK_FAILED_ACTION:
      console.log('Faied to delete report task');
      console.log(action['payload'].oldData);
      
      return {
        ...state,
        deleteReportTaskFailed: {
          state: true,
          oldData: action['payload'].oldData
        }
      };

    case ActionTypes.CLEAR_REPORT_TASK_CREATION_ERROR_ACTION:
      return {
        ...state,
        createReportTaskFailed: {
          state: false,
          rowId: undefined
        }
      };

    case ActionTypes.CLEAR_REPORT_TASK_UPDATE_ERROR_ACTION:
      return {
        ...state,
        updateReportTaskFailed: {
          state: false,
          oldData: {}
        }
      };

    case ActionTypes.CLEAR_REPORT_TASK_DELETE_ERROR_ACTION:
        console.log("Clearing delete state");
        
      return {
        ...state,
        deleteReportTaskFailed: {
          state: false,
          oldData: {}
        }
      };

    default:
      return state;
  }
}

export default createReportPageReducer;
