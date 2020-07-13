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
  },
  submitReportFailed: false
};

function createReportPageReducer(
  state: ContainerState = initialState,
  action: ContainerActions
): ContainerState {
  switch (action.type) {
    case ActionTypes.CREATE_REPORT_FAILED_ACTION:
      return {
        ...state
      };

    case ActionTypes.CREATE_REPORT_TASK_FAILED_ACTION:
      return {
        ...state,
        createReportTaskFailed: {
          state: true,
          rowId: action['payload'].rowId
        }
      };

    case ActionTypes.UPDATE_REPORT_TASK_FAILED_ACTION:
      return {
        ...state,
        updateReportTaskFailed: {
          state: true,
          oldData: action['payload'].oldData
        }
      };

    case ActionTypes.DELETE_REPORT_TASK_FAILED_ACTION:
      return {
        ...state,
        deleteReportTaskFailed: {
          state: true,
          oldData: action['payload'].oldData
        }
      };

    case ActionTypes.SUBMIT_REPORT_FAILED_ACTION:
      return {
        ...state,
        submitReportFailed: true
      };

    case ActionTypes.CLEAR_SUBMIT_REPORT_ERROR_ACTION:
      return {
        ...state,
        submitReportFailed: false
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
