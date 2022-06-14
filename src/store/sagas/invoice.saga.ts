import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { generateInvoice, getInvoicesList, removeInvoice } from '../actions/invoice.actions';
import { failSnackBar } from '../actions/snackbar.actions';
import {
  apiGenerateInvoice,
  apiGetInvoicesList,
  apiRemoveInvoice,
} from './services/invoice.service';

export function* getInvoicesListWorker(): SagaIterator {
  try {
    const invoices = yield call(apiGetInvoicesList);
    yield put(getInvoicesList(invoices));
  } catch (e) {
    yield put(failSnackBar(e.message));
  }
}

type Params = { data: { invoiceName: string }; type: string };

export function* removeInvoiceWorker({ data }: Params): SagaIterator {
  try {
    const invoice = yield call(apiRemoveInvoice, data.invoiceName);
    yield put(removeInvoice(invoice.deletedInvoice));
  } catch (e) {
    yield put(failSnackBar(e.message));
  }
}

export function* generateInvoiceWorker(): SagaIterator {
  try {
    yield call(apiGenerateInvoice);
    yield put(generateInvoice());
  } catch (e) {
    yield put(failSnackBar(e.message));
  }
}
