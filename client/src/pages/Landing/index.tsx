import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import MainLayout from '../../components/_layout';
import Invoice from '../../interfaces/Invoice';
import { RootState } from '../../store';
import { getInvoiceList } from '../../store/Invoices/actions';
import { InvoiceState } from '../../store/Invoices/interfaces';
import StandardLink from '../../components/shared/StandardLink';

const formatDueDate = (dueDate: string | null) => {
  if (!dueDate) return '';
  return `Due ${format(new Date(dueDate), 'MM dd yyyy')}`;
};

// INVOICE ITEM
const InvoiceListItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: space-evenly;
  width: 100%;
  padding: 1rem;
`;

interface InvoiceListItemProps {
  invoice: Invoice;
}

const InvoiceListItem: React.FC<InvoiceListItemProps> = ({ invoice }) => (
  <StandardLink to={`/invoice/${invoice.id}`}>
    <InvoiceListItemContainer>
      <div>{invoice.id}</div>
      <div>{formatDueDate(invoice.dateDue)}</div>
      <div>{invoice.billTo.personalDetails.lastName}</div>
      <div>{invoice.status}</div>
    </InvoiceListItemContainer>
  </StandardLink>
);

// INVOICE LIST

const InvoiceListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface InvoiceListProps {
  invoiceList: Invoice[];
}

const InvoiceList: React.FC<InvoiceListProps> = ({ invoiceList }) => {
  return (
    <InvoiceListContainer>
      {invoiceList.map((invoice: Invoice) => (
        <InvoiceListItem key={invoice.id} invoice={invoice} />
      ))}
    </InvoiceListContainer>
  );
};

const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, invoiceList } = useSelector<RootState>(
    (state) => state.invoices,
  ) as InvoiceState;
  useEffect(() => {
    dispatch(getInvoiceList());
  }, []);

  return (
    <MainLayout>
      <div>Invoices</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <InvoiceList invoiceList={invoiceList} />
      )}
    </MainLayout>
  );
};

export default LandingPage;
