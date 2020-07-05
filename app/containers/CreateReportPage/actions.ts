import { action } from 'typesafe-actions';
import ActionTypes from './constants';
import { Task, Report } from 'containers/HomePage/types';

export const createReportAction = (
  startDate: Date,
  endDate: Date,
  customerId: Number,
  employeeId: Number,
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
  hours: Number,
  description: String
) =>
  action(ActionTypes.CREATE_REPORT_TASK_ACTION, {
    report,
    datePerformed,
    hours,
    description
  });

export const createReportFailed = () =>
  action(ActionTypes.CREATE_REPORT_FAILED_ACTION);

export const createReportTaskFailed = () =>
  action(ActionTypes.CREATE_REPORT_TASK_FAILED_ACTION);
