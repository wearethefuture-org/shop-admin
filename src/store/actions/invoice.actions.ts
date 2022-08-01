import { IActions } from '../../interfaces/actions';
import { IInvoice } from '../../interfaces/IInvoice';
import {
  GENERATE_INVOICE,
  GENERATE_INVOICE_REQUEST,
  GET_INVOICES_LIST,
  GET_INVOICES_LIST_REQUEST,
  REMOVE_INVOICE,
  REMOVE_INVOICE_REQUEST,
} from '../types';

export const fetchInvoicesList = (): IActions => ({ type: GET_INVOICES_LIST_REQUEST });

export const getInvoicesList = (invoicesList: IInvoice[]): IActions => ({
  type: GET_INVOICES_LIST,
  data: invoicesList,
});

export const removeInvoiceRequest = (invoiceName: string): IActions => ({
  type: REMOVE_INVOICE_REQUEST,
  data: { invoiceName },
});

export const removeInvoice = (invoiceName: string): IActions => ({
  type: REMOVE_INVOICE,
  data: { invoiceName },
});

export const generateInvoiceRequest = (): IActions => ({
  type: GENERATE_INVOICE_REQUEST,
});

export const generateInvoice = (): IActions => ({
  type: GENERATE_INVOICE,
});
