import { call, put, takeLatest } from 'redux-saga/effects';
import ActionTypes from './constants';
import { postRequest } from 'utils/request';
import { ContainerActions } from './types';
import { createReportSuccess, createReportTaskSuccess } from '../App/actions';
import { createReportFailed, createReportTaskFailed } from './actions';
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
    console.log("RESPONSE");
    
        console.log(response);
        
    yield put(createReportTaskSuccess(response));
  } catch (err) {
    yield put(createReportTaskFailed(action['payload'].rowId));
  }
}

export default function* createReportSaga() {
  yield takeLatest(ActionTypes.CREATE_REPORT_ACTION, createReport);
  yield takeLatest(ActionTypes.CREATE_REPORT_TASK_ACTION, createReportTask);
}
