import { InvoiceDateRange } from '../enums/invoiceDateRange';
import { IInvoiceDateRange } from '../interfaces/IInvoice';

const today = new Date();

export function getInvoiceDateRange(invoiceDateRange: InvoiceDateRange): IInvoiceDateRange {
  switch (invoiceDateRange) {
    case InvoiceDateRange.ONE_DAY_AGO:
      return {
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
        endDate: today,
      };
    case InvoiceDateRange.ONE_WEEK_AGO:
      return {
        startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
        endDate: today,
      };
    case InvoiceDateRange.ONE_MONTH_AGO:
      return {
        startDate: new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()),
        endDate: today,
      };
    case InvoiceDateRange.ONE_YEAR_AGO:
      return {
        startDate: new Date(today.getFullYear() - 1, today.getMonth(), today.getDate()),
        endDate: today,
      };
  }
}
