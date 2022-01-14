import Invoice from '../../interfaces/Invoice';

export interface InvoiceState {
  isLoading: boolean;
  invoiceList: Invoice[];
  activeInvoice: Invoice | null;
}
