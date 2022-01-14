import Invoice from '../../interfaces/Invoice';
import invoiceData from '../../assets/data/invoice-data.json';

// used to simulate async call whilst using test data
export const getInvoiceData = async (): Promise<Invoice[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(invoiceData as Invoice[]);
    }, 1000);
  });
};

// used to simulate async call
export const saveInvoiceData = async (invoice: Invoice): Promise<Invoice> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(invoice);
    }, 1000);
  });
};
