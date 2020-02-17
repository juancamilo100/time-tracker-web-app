import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';
import ActionTypes from './constants';
import { postRequest } from 'utils/request';
import { authActionStart } from './actions';
import { ContainerActions } from './types';
import { authActionSuccess, authActionError } from '../App/actions';

export function* authenticate(action: ContainerActions) {
    // put(authActionStart());
    const requestURL = `http://localhost:9000/api/auth/login`;
    // const requestBody = { 
    //     email: "contact@lulosoft.com", 
    //     password: "bXlMdSFvNW9mXiE=" 
    // }
    const requestBody = { 
        email: action.payload.email, 
        password: action.payload.password 
    }
    const requestHeaders = {
        "content-type": "application/json"
    }
  try {
    const response = yield call(postRequest, requestURL, requestBody, requestHeaders);
    
    yield put(authActionSuccess(response.auth, response.token));
  } catch (err) {
    yield put(authActionError());
  }
}

export default function* loginUser() {
    yield takeLatest(ActionTypes.AUTH_ACTION_START, authenticate);
}
