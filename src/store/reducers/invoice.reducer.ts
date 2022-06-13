import { IActions } from '../../interfaces/actions';
import { IInvoiceData } from '../../interfaces/IInvoice';
import { GET_INVOICES_LIST } from '../types';

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
    default:
      return state;
  }
};

export default invoice;
