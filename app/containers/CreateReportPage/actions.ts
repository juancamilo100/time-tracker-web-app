import { action } from 'typesafe-actions';
import ActionTypes from './constants';
import { Task, Report } from 'containers/HomePage/types';

export const createReportAction = (
  startDate: Date,
  endDate: Date,
  customerId: number,
  employeeId: number,
  tasks: Task[]
) =>
  action(ActionTypes.CREATE_REPORT_ACTION, {
    startDate,
    endDate,
    customerId,
    employeeId,
    tasks
  });

export const createReportTaskAction = (
  report: Report,
  datePerformed: Date,
  hours: number,
  description: String,
  rowId: number
) =>
  action(ActionTypes.CREATE_REPORT_TASK_ACTION, {
    report,
    datePerformed,
    hours,
    description,
    rowId
  });

export const updateReportTaskAction = (
  taskId: number,
  reportId: number,
  datePerformed: Date,
  hours: number,
  description: String,
  oldData: object
) =>
  action(ActionTypes.UPDATE_REPORT_TASK_ACTION, {
    taskId,
    reportId,
    datePerformed,
    hours,
    description,
    oldData
  });

export const createReportFailed = () =>
  action(ActionTypes.CREATE_REPORT_FAILED_ACTION);

export const updateReportTaskFailed = (oldData: object) =>
  action(ActionTypes.UPDATE_REPORT_TASK_FAILED_ACTION, {
    oldData
  });

export const createReportTaskFailed = (rowId: number) =>
  action(ActionTypes.CREATE_REPORT_TASK_FAILED_ACTION, {
    rowId
  });

export const clearReportTaskCreationErrorAction = () =>
  action(ActionTypes.CLEAR_REPORT_TASK_CREATION_ERROR_ACTION);
  
export const clearReportTaskUpdateErrorAction = () =>
  action(ActionTypes.CLEAR_REPORT_TASK_UPDATE_ERROR_ACTION);
