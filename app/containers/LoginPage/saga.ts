import { call, put, takeLatest } from 'redux-saga/effects';
import ActionTypes from './constants';
import { postRequest } from 'utils/request';
import { ContainerActions } from './types';
import { authActionSuccess, authActionError } from '../App/actions';
import { TIME_TRACKER_API_BASE_URL, TIME_TRACKER_API_PORT } from 'config';

export function* authenticate(action: ContainerActions) {
  const requestURL = `http://${TIME_TRACKER_API_BASE_URL}:${TIME_TRACKER_API_PORT}/api/auth/login`;
  console.log(requestURL);

  const requestBody = {
    email: action.payload.email,
    password: Buffer.from(action.payload.password).toString('base64'),
  };
  const requestHeaders = {
    'content-type': 'application/json',
  };
  try {
    const response = yield call(
      postRequest,
      requestURL,
      requestBody,
      requestHeaders,
    );

    yield put(authActionSuccess(response.auth, response.token));
  } catch (err) {
    yield put(authActionError());
  }
}

export default function* loginUser() {
  yield takeLatest(ActionTypes.AUTH_ACTION_START, authenticate);
}
