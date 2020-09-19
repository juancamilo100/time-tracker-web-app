import { call, put, takeLatest } from 'redux-saga/effects';
import ActionTypes from './constants';
import { ContainerActions } from './types';
import moment from 'moment';
import { JWT_SESSION_STORAGE_NAME } from '../App/constants';
import { TIME_TRACKER_API_BASE_URL } from 'config';
import { postRequest } from 'utils/request';
import { changePasswordSuccess } from '../App/actions';
import { changePasswordFailedAction, changingPasswordAction, changedPasswordAction } from './actions';

export function* changePassword(action: ContainerActions) {
    yield put(changingPasswordAction());
    const requestURL = `http://${TIME_TRACKER_API_BASE_URL}/api/employees/${action['payload'].customerId}/invoice`;
    const requestBody = {
      invoiceStartDate: moment(action['payload'].startDate).format('MM/DD/YYYY'),
      invoiceEndDate: moment(action['payload'].endDate).format('MM/DD/YYYY'),
      reportIds: action['payload'].reportIds,
    };
  
    const requestHeaders = {
      'content-type': 'application/json',
      Authorization: sessionStorage.getItem(JWT_SESSION_STORAGE_NAME)
    };
  
    try {
      yield call(
        postRequest,
        requestURL,
        requestBody,
        requestHeaders
      );
  
      yield put(changePasswordSuccess());
      yield put(changedPasswordAction());
    } catch (err) {
      yield put(changePasswordFailedAction());
    }
  }

// Individual exports for testing
export default function* invoiceDeliverySaga() {
    yield takeLatest(ActionTypes.CHANGE_PASSWORD_ACTION, changePassword);
}
