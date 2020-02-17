import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';
import ActionTypes from './constants';
import { postRequest } from 'utils/request';
import { ContainerActions } from './types';
import { authActionSuccess, authActionError } from '../App/actions';

export function* authenticate(action: ContainerActions) {
  const requestURL = `http://localhost:9000/api/auth/login`;
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
