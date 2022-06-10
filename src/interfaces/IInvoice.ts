export interface IInvoiceFile {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export interface IInvoice {
  id: number;
  createdAt: string;
  updatedAt: string;
  url?: string;
  invoiceFile: IInvoiceFile;
}

export interface IInvoiceData {
  invoiceFile?: IInvoiceFile;
  invoicesList?: IInvoice[];
}
