import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';
import ActionTypes from './constants';
import { postRequest } from 'utils/request';
import { authActionError } from './actions';
import { ContainerActions } from './types';
import { authActionSuccess } from '../App/actions';

export function* authenticate(action: ContainerActions) {
    const requestURL = `http://localhost:9000/api/auth/login`;
    const requestBody = { 
        email: "contact@lulosoft.com", 
        password: "bXlMdSFvNW9mXiE=" 
    }
    // const requestBody = { 
    //     email: action.payload.email, 
    //     password: action.payload.password 
    // }
    const requestHeaders = {
        "content-type": "application/json"
    }
    console.log("Called auth saga!");
    console.log(action.payload);
    
  try {
    const response = yield call(postRequest, requestURL, requestBody, requestHeaders);
    // console.log(response);
    console.log("Calling AuthActionSuccess action!");
    
    yield put(authActionSuccess(response.auth, response.token));
  } catch (err) {
    yield put(authActionError(err));
  }
}

export default function* loginUser() {
    yield takeLatest(ActionTypes.AUTH_ACTION_START, authenticate);
}
