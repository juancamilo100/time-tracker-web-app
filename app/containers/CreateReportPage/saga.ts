import { call, put, takeLatest } from 'redux-saga/effects';
import ActionTypes from './constants';
import { postRequest, patchRequest, deleteRequest } from 'utils/request';
import { ContainerActions } from './types';
import {
  createReportSuccess,
  createReportTaskSuccess,
  updateReportTaskSuccess,
  deleteReportTaskSuccess
} from '../App/actions';
import {
  createReportFailed,
  createReportTaskFailed,
  updateReportTaskFailed,
  deleteReportTaskFailed
} from './actions';
import { TIME_TRACKER_API_BASE_URL } from 'config';
import { JWT_SESSION_STORAGE_NAME } from '../App/constants';
import moment from 'moment';

export function* createReport(action: ContainerActions) {
  const requestURL = `http://${TIME_TRACKER_API_BASE_URL}/api/reports`;
  const requestBody = {
    customerId: action['payload'].customerId,
    employeeId: action['payload'].employeeId,
    startDate: moment(action['payload'].startDate).format('MM/DD/YYYY'),
    endDate: moment(action['payload'].endDate).format('MM/DD/YYYY'),
    tasks: action['payload'].tasks,
    submitted: false
  };

  const requestHeaders = {
    'content-type': 'application/json',
    Authorization: sessionStorage.getItem(JWT_SESSION_STORAGE_NAME)
  };

  try {
    const response = yield call(
      postRequest,
      requestURL,
      requestBody,
      requestHeaders
    );

    yield put(createReportSuccess(response));
  } catch (err) {
    yield put(createReportFailed());
  }
}

export function* createReportTask(action: ContainerActions) {
  const currentReport = action['payload'].report;
  const requestURL = `http://${TIME_TRACKER_API_BASE_URL}/api/reports/${
    currentReport.id
  }/tasks`;

  const requestBody = {
    hours: action['payload'].hours,
    description: action['payload'].description,
    datePerformed: moment(action['payload'].datePerformed).format('MM/DD/YYYY')
  };

  const requestHeaders = {
    'content-type': 'application/json',
    Authorization: sessionStorage.getItem(JWT_SESSION_STORAGE_NAME)
  };

  try {
    const response = yield call(
      postRequest,
      requestURL,
      requestBody,
      requestHeaders
    );

    yield put(createReportTaskSuccess(response));
  } catch (err) {
    yield put(createReportTaskFailed(action['payload'].rowId));
  }
}

export function* updateReportTask(action: ContainerActions) {
  const taskToUpdate = action['payload'];
  const requestURL = `http://${TIME_TRACKER_API_BASE_URL}/api/reports/${
    taskToUpdate.reportId
  }/tasks/${taskToUpdate.taskId}`;

  const requestBody = {
    ...(action['payload'].hours && { hours: action['payload'].hours }),
    ...(action['payload'].description && {
      description: action['payload'].description
    }),
    ...(action['payload'].datePerformed && {
      datePerformed: moment(action['payload'].datePerformed).format(
        'MM/DD/YYYY'
      )
    })
  };

  const requestHeaders = {
    'content-type': 'application/json',
    Authorization: sessionStorage.getItem(JWT_SESSION_STORAGE_NAME)
  };

  try {
    const response = yield call(
      patchRequest,
      requestURL,
      requestBody,
      requestHeaders
    );

    yield put(updateReportTaskSuccess(response));
  } catch (err) {
    yield put(updateReportTaskFailed(action['payload'].oldData));
  }
}

export function* deleteReportTask(action: ContainerActions) {
  const taskToDelete = action['payload'];
  const requestURL = `http://${TIME_TRACKER_API_BASE_URL}/api/reports/${
    taskToDelete.reportId
  }/tasks/${taskToDelete.taskId}`;

  const requestHeaders = {
    'content-type': 'application/json',
    Authorization: sessionStorage.getItem(JWT_SESSION_STORAGE_NAME)
  };

  try {
    yield call(deleteRequest, requestURL, requestHeaders);

    yield put(deleteReportTaskSuccess());
  } catch (err) {
      console.log("Failed deletting saga");
      
    yield put(deleteReportTaskFailed(action['payload'].oldData));
  }
}

export default function* createReportSaga() {
  yield takeLatest(ActionTypes.CREATE_REPORT_ACTION, createReport);
  yield takeLatest(ActionTypes.CREATE_REPORT_TASK_ACTION, createReportTask);
  yield takeLatest(ActionTypes.UPDATE_REPORT_TASK_ACTION, updateReportTask);
  yield takeLatest(ActionTypes.DELETE_REPORT_TASK_ACTION, deleteReportTask);
}
