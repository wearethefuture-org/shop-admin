import { api } from '../../../api/api';

export async function apiGetInvoicesList() {
  const invoices = await api.invoice.getInvoicesList();
  return invoices.data;
}

export async function apiGetInvoice(name: string) {
  const invoice = await api.invoice.getInvoice(name);
  return invoice.data;
}
