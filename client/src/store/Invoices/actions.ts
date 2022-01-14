import { Dispatch } from 'react';
import { RootState } from '..';
import Invoice from '../../interfaces/Invoice';
import {
  getInvoiceData,
  saveInvoiceData,
} from '../../utils/server/fetchValues';
import {
  CLEAR_ACTIVE_INVOICE,
  GETTING_INVOICE_LIST,
  GOT_INVOICE_LIST,
  IS_LOADING,
  LOADING_COMPLETE,
  UPDATE_ACTIVE_INVOICE,
} from './consts';

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

export interface IsLoading {
  type: typeof IS_LOADING;
}

export interface LoadingComplete {
  type: typeof LOADING_COMPLETE;
}

export type InvoiceActions =
  | GettingInvoiceList
  | GotInvoiceList
  | UpdateActiveInvoice
  | ClearActiveInvoice
  | IsLoading
  | LoadingComplete;

const isLoading = (): IsLoading => ({
  type: IS_LOADING,
});

const loadingComplete = (): LoadingComplete => ({
  type: LOADING_COMPLETE,
});

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

export const getInvoiceList = (force: boolean = false) => {
  return async (
    dispatch: Dispatch<InvoiceActions>,
    getState: () => RootState,
  ): Promise<void> => {
    const state = getState();
    const currentInvoices = state.invoices.invoiceList;

    if (currentInvoices.length !== 0 && !force) {
      return;
    }

    dispatch(gettingInvoiceList());

    const invoices = await getInvoiceData();
    dispatch(gotInvoiceList(invoices));
  };
};

export const saveInvoice = (invoice: Invoice) => {
  return async (
    dispatch: Dispatch<InvoiceActions>,
    getState: () => RootState,
  ): Promise<void> => {
    dispatch(isLoading());
    const state = getState();

    const savedInvoice = await saveInvoiceData(invoice);

    const currentInvoices = state.invoices.invoiceList;

    const existingInvoiceIndex = currentInvoices.findIndex(
      (invoice) => invoice.id === savedInvoice.id,
    );

    if (existingInvoiceIndex !== -1) {
      currentInvoices[existingInvoiceIndex] = savedInvoice;
    } else {
      currentInvoices.push(savedInvoice);
    }

    dispatch(gotInvoiceList(currentInvoices));
    dispatch(updateActiveInvoice(savedInvoice));
  };
};
