import { InvoiceActions } from './actions';
import {
  CLEAR_ACTIVE_INVOICE,
  GETTING_INVOICE_LIST,
  GOT_INVOICE_LIST,
  UPDATE_ACTIVE_INVOICE,
} from './consts';
import { InvoiceState } from './interfaces';

export const INITIAL_STATE: InvoiceState = {
  isLoading: false,
  invoiceList: [],
  activeInvoice: null,
};

const invoices = (
  state = INITIAL_STATE,
  action: InvoiceActions,
): InvoiceState => {
  switch (action.type) {
    case GETTING_INVOICE_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case GOT_INVOICE_LIST:
      return {
        ...state,
        isLoading: false,
        invoiceList: action.payload,
      };
    case UPDATE_ACTIVE_INVOICE:
      return {
        ...state,
        activeInvoice: action.payload,
      };
    case CLEAR_ACTIVE_INVOICE:
      return {
        ...state,
        activeInvoice: null,
      };

    default:
      return state;
  }
};

export default invoices;
