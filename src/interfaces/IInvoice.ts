export interface IInvoiceFile {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  url?: string;
  fileSize: number;
}

export interface IInvoice {
  id: number;
  createdAt: string;
  updatedAt: string;
  url?: string;
  fileSize: number;
  invoiceFile: IInvoiceFile;
}

export interface IInvoiceData {
  invoiceFile?: IInvoiceFile;
  invoicesList?: IInvoice[];
}
