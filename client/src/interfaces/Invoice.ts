interface Address {
  streetAddressLine1: string;
  streetAddressLine2: string | null;
  streetAddressLine3?: string | null;
  city: string;
  state: string | null;
  postCode: string;
  country: string;
}

interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
}

export interface ItemBase {
  id: string;
  name: string;
  description: string;
  price: string;
  currency: string;
}

interface BillableItem extends ItemBase {
  quantity: number;
}

export enum InvoiceStatus {
  draft = 'draft',
  sent = 'sent',
  paid = 'paid',
  cancelled = 'cancelled',
}

interface Invoice {
  title: string;
  id: string;
  dateSent: Date | null;
  billFrom: {
    address: Address;
  };
  billTo: {
    address: Address;
    personalDetails: PersonalDetails;
  };
  description: string;
  items: BillableItem[];
  status: InvoiceStatus;
}

export default Invoice;
