import { action } from 'typesafe-actions';
import ActionTypes from './constants';
import { Task } from 'containers/HomePage/types';

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

export const createReportFailed = () =>
  action(ActionTypes.CREATE_REPORT_FAILED);