import { Dispatch } from 'react';
import { RootState } from '..';
import Invoice from '../../interfaces/Invoice';
import {
  CLEAR_ACTIVE_INVOICE,
  GETTING_INVOICE_LIST,
  GOT_INVOICE_LIST,
  LOAD_INVOICE,
  SAVE_INVOICE,
  UPDATE_ACTIVE_INVOICE,
} from './consts';
import invoiceData from '../../assets/data/invoice-data.json';

export interface GettingInvoiceList {
  type: typeof GETTING_INVOICE_LIST;
}

export interface GotInvoiceList {
  type: typeof GOT_INVOICE_LIST;
  payload: Invoice[];
}

export interface UpdateActiveInvoice {
  type: typeof UPDATE_ACTIVE_INVOICE;
  payload: Invoice;
}

export interface ClearActiveInvoice {
  type: typeof CLEAR_ACTIVE_INVOICE;
}

export interface SaveInvoice {
  type: typeof SAVE_INVOICE;
  payload: Invoice;
}

export interface LoadInvoice {
  type: typeof LOAD_INVOICE;
  payload: Invoice;
}

export type InvoiceActions =
  | GettingInvoiceList
  | GotInvoiceList
  | UpdateActiveInvoice
  | ClearActiveInvoice
  | SaveInvoice
  | LoadInvoice;

const gettingInvoiceList = (): GettingInvoiceList => ({
  type: GETTING_INVOICE_LIST,
});

const gotInvoiceList = (payload: Invoice[]): GotInvoiceList => ({
  type: GOT_INVOICE_LIST,
  payload,
});

const updateActiveInvoice = (payload: Invoice): UpdateActiveInvoice => ({
  type: UPDATE_ACTIVE_INVOICE,
  payload,
});

const clearActiveInvoice = (): ClearActiveInvoice => ({
  type: CLEAR_ACTIVE_INVOICE,
});

export const setActiveInvoice = (id: string) => {
  return async (
    dispatch: Dispatch<InvoiceActions>,
    getState: () => RootState,
  ): Promise<void> => {
    const state = getState();
    let invoices = state.invoices.invoiceList;
    if (invoices.length === 0) {
      dispatch(gettingInvoiceList());

      invoices = await getInvoiceData();
      dispatch(gotInvoiceList(invoices));
    }

    const activeInvoice = invoices.find((invoice) => invoice.id === id);
    if (activeInvoice) {
      dispatch(updateActiveInvoice(activeInvoice));
    }
  };
};

export const getInvoiceList = () => {
  return async (
    dispatch: Dispatch<InvoiceActions>,
    getState: () => RootState,
  ): Promise<void> => {
    dispatch(gettingInvoiceList());

    const invoices = await getInvoiceData();
    dispatch(gotInvoiceList(invoices));
  };
};

// used to simulate async call whilst using test data
const getInvoiceData = async (): Promise<Invoice[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(invoiceData as Invoice[]);
    }, 1000);
  });
};
