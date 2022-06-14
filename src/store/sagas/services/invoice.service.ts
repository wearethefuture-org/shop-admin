import { api } from '../../../api/api';

export async function apiGetInvoicesList() {
  const invoices = await api.invoice.getInvoicesList();
  return invoices.data;
}

export async function apiRemoveInvoice(name: string) {
  const invoices = await api.invoice.removeInvoice(name);
  return { deletedInvoice: name };
}

export async function apiGenerateInvoice() {
  const res = await api.invoice.generateInvoice();
  return res.data;
}
