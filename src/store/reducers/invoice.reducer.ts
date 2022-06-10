import { IActions } from '../../interfaces/actions';
import { IInvoiceData } from '../../interfaces/IInvoice';
import { GET_INVOICE, GET_INVOICES_LIST } from '../types';

const initialState: IInvoiceData = {
  invoiceFile: undefined,
  invoicesList: [],
};

const invoice = (state = initialState, action: IActions) => {
  switch (action.type) {
    case GET_INVOICES_LIST: {
      return {
        ...state,
        invoicesList: action.data,
      };
    }
    case GET_INVOICE: {
      return {
        ...state,
        invoiceFile: action.data,
      };
    }
    default:
      return state;
  }
};

export default invoice;
