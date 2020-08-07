import { call, put, takeLatest } from 'redux-saga/effects';
import ActionTypes from './constants';
import { ContainerActions } from './types';
import moment from 'moment';
import { JWT_SESSION_STORAGE_NAME } from '../App/constants';
import { TIME_TRACKER_API_BASE_URL } from 'config';
import { postRequest } from 'utils/request';
import { deliverInvoiceSuccess } from '../App/actions';
import { deliverInvoiceFailedAction, deliveringInvoiceAction, deliveredInvoiceAction } from './actions';

export function* deliverInvoice(action: ContainerActions) {
    yield put(deliveringInvoiceAction());
    const requestURL = `http://${TIME_TRACKER_API_BASE_URL}/api/customers/${action['payload'].customerId}/invoice`;
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
  
      yield put(deliverInvoiceSuccess());
      yield put(deliveredInvoiceAction());
    } catch (err) {
        console.log(err);
        
      yield put(deliverInvoiceFailedAction());
    }
  }

// Individual exports for testing
export default function* invoiceDeliverySaga() {
    yield takeLatest(ActionTypes.DELIVER_INVOICE_ACTION, deliverInvoice);
}
