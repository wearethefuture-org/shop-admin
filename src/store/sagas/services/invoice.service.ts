import { api } from '../../../api/api';

export async function apiGetInvoicesList() {
  const invoices = await api.invoice.getInvoicesList();
  return invoices.data;
}
