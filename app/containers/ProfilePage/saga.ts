import { call, put, takeLatest } from 'redux-saga/effects';
import ActionTypes from './constants';
import { ContainerActions } from './types';
import { JWT_SESSION_STORAGE_NAME } from '../App/constants';
import { TIME_TRACKER_API_BASE_URL } from 'config';
import { patchRequest } from 'utils/request';
import { changePasswordSuccess } from '../App/actions';
import { changePasswordFailedAction, changingPasswordAction, changedPasswordAction } from './actions';

export function* changePassword(action: ContainerActions) {
    yield put(changingPasswordAction());
    const requestURL = `http://${TIME_TRACKER_API_BASE_URL}/api/employees/${action['payload'].employeeId}/password`;
    const requestBody = {
        oldPassword: Buffer.from(action['payload'].oldPassword).toString('base64'),
        newPassword: Buffer.from(action['payload'].newPassword).toString('base64'),
    };
  
    const requestHeaders = {
      'content-type': 'application/json',
      Authorization: sessionStorage.getItem(JWT_SESSION_STORAGE_NAME)
    };
  
    try {
      yield call(
        patchRequest,
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
export default function* profileSaga() {
    yield takeLatest(ActionTypes.CHANGE_PASSWORD_ACTION, changePassword);
}
