import { api } from '../../../api/api';
import { IInvoiceDateRange } from '../../../interfaces/IInvoice';

export async function apiGetInvoicesList() {
  const invoices = await api.invoice.getInvoicesList();
  return invoices.data;
}

export async function apiRemoveInvoice(name: string) {
  await api.invoice.removeInvoice(name);
  return { deletedInvoice: name };
}

export async function apiGenerateInvoice(invoiceDateRange: IInvoiceDateRange) {
  const res = await api.invoice.generateInvoice(invoiceDateRange);
  return res.data;
}
