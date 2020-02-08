// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, put } from 'redux-saga/effects';


export default function* authenticate() {
  // See example in containers/HomePage/saga.js

    const requestURL = `http://localhost:9000/api/employees`;
    console.log(requestURL);
    
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(authAction(username, password));
  } catch (err) {
    yield put(authError(err));
  }

  export default function* loginUser() {
    // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount
    yield takeLatest(ActionTypes.LOAD_REPOS, authenticate);
  }
}
