import { IActions } from '../../interfaces/actions';
import { IInvoice } from '../../interfaces/IInvoice';
import { GET_INVOICES_LIST, GET_INVOICES_LIST_REQUEST } from '../types';

export const fetchInvoicesList = (): IActions => ({ type: GET_INVOICES_LIST_REQUEST });

export const getInvoicesList = (invoicesList: IInvoice[]): IActions => ({
  type: GET_INVOICES_LIST,
  data: invoicesList,
});
