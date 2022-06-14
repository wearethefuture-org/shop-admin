import { IActions } from '../../interfaces/actions';
import { IInvoiceData } from '../../interfaces/IInvoice';
import { GENERATE_INVOICE, GET_INVOICES_LIST, REMOVE_INVOICE } from '../types';

const initialState: IInvoiceData = {
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
    case REMOVE_INVOICE: {
      const newInvoicesList = state.invoicesList?.filter(
        (i) => i.invoiceFile !== action.data.invoiceName
      );
      return {
        ...state,
        invoiceList: newInvoicesList,
      };
    }
    case GENERATE_INVOICE: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default invoice;
