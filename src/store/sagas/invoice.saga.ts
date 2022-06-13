import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { getInvoicesList } from '../actions/invoice.actions';
import { failSnackBar } from '../actions/snackbar.actions';
import { apiGetInvoicesList } from './services/invoice.service';

export function* getInvoicesListWorker(): SagaIterator {
  try {
    const invoices = yield call(apiGetInvoicesList);
    yield put(getInvoicesList(invoices));
  } catch (e) {
    yield put(failSnackBar(e.message));
  }
}
