import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { IInvoiceDateRange } from '../../interfaces/IInvoice';
import { generateInvoice, getInvoicesList, removeInvoice } from '../actions/invoice.actions';
import { failSnackBar, successSnackBar } from '../actions/snackbar.actions';
import { apiGenerateInvoice, apiGetInvoicesList, apiRemoveInvoice } from './services/invoice.service';

export function* getInvoicesListWorker(): SagaIterator {
  try {
    const invoices = yield call(apiGetInvoicesList);
    yield put(getInvoicesList(invoices));
  } catch (e) {
    yield put(failSnackBar(e.message));
  }
}

type removeParams = { data: { invoiceName: string }; type: string };

export function* removeInvoiceWorker({ data }: removeParams): SagaIterator {
  try {
    const invoice = yield call(apiRemoveInvoice, data.invoiceName);
    yield put(removeInvoice(invoice.deletedInvoice));
    yield put(successSnackBar());
  } catch (e) {
    yield put(failSnackBar(e.message));
  }
}

type generateParams = { data: { invoiceDateRange: IInvoiceDateRange }; type: IInvoiceDateRange };

export function* generateInvoiceWorker({ data }: generateParams): SagaIterator {
  try {
    const invoice = yield call(apiGenerateInvoice, data.invoiceDateRange);
    yield put(generateInvoice(invoice));
  } catch (e) {
    yield put(failSnackBar(e.message));
  }
}
