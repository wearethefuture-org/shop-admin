import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { getInvoice, getInvoicesList } from '../actions/invoice.actions';
import { failSnackBar } from '../actions/snackbar.actions';
import { apiGetInvoice, apiGetInvoicesList } from './services/invoice.service';

export function* getInvoicesListWorker(): SagaIterator {
  try {
    const invoices = yield call(apiGetInvoicesList);
    yield put(getInvoicesList(invoices));
  } catch (e) {
    yield put(failSnackBar(e.message));
  }
}

type Params = { data: { name: string }; type: string };

export function* getInvoiceWorker({ data }: Params): SagaIterator {
  try {
    const invoice = yield call(apiGetInvoice, data.name);
    yield put(getInvoice(invoice.name));
  } catch (e) {
    yield put(failSnackBar(e.message));
  }
}
