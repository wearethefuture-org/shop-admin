import { IActions } from '../../interfaces/actions';
import { IInvoice } from '../../interfaces/IInvoice';
import {
  GET_INVOICE,
  GET_INVOICES_LIST,
  GET_INVOICES_LIST_REQUEST,
  GET_INVOICE_REQUEST,
} from '../types';

export const fetchInvoicesList = (): IActions => ({ type: GET_INVOICES_LIST_REQUEST });

export const getInvoicesList = (invoicesList: IInvoice[]): IActions => ({
  type: GET_INVOICES_LIST,
  data: invoicesList,
});

export const fetchGetInvoice = (name: string): IActions => ({
  type: GET_INVOICE_REQUEST,
  data: { name },
});

export const getInvoice = (name: string): IActions => ({
  type: GET_INVOICE,
  data: { name },
});
