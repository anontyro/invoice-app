import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import MainLayout from '../../components/_layout';
import Invoice from '../../interfaces/Invoice';
import { RootState } from '../../store';
import { setActiveInvoice } from '../../store/Invoices/actions';
import { InvoiceState } from '../../store/Invoices/interfaces';

interface InvoiceDisplayProps {
  invoice: Invoice;
}

const InvoiceDisplay: React.FC<InvoiceDisplayProps> = ({ invoice }) => {
  return (
    <div>
      <h1>{invoice.title}</h1>
    </div>
  );
};

const InvoicePage: React.FC = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { isLoading, activeInvoice } = useSelector<RootState>(
    (state) => state.invoices,
  ) as InvoiceState;
  useEffect(() => {
    dispatch(setActiveInvoice(id ?? ''));
  }, []);

  return (
    <MainLayout>
      <h3>Invoice page for: {id}</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : activeInvoice !== null ? (
        <InvoiceDisplay invoice={activeInvoice} />
      ) : (
        <div>No invoice found</div>
      )}
    </MainLayout>
  );
};

export default InvoicePage;
