import styled from '@emotion/styled';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import MainLayout from '../../components/_layout';
import Invoice, { InvoiceStatus } from '../../interfaces/Invoice';
import { RootState } from '../../store';
import { saveInvoice, setActiveInvoice } from '../../store/Invoices/actions';
import { InvoiceState } from '../../store/Invoices/interfaces';

const InvoiceFormContainer = styled.div``;
interface InvoiceEditFormProps {
  invoice: Invoice;
}

const StandardInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InvoiceEditForm: React.FC<InvoiceEditFormProps> = ({ invoice }) => {
  const dispatch = useDispatch();

  return (
    invoice && (
      <InvoiceFormContainer>
        <h1>Edit Invoice #{invoice.id}</h1>
        <Formik
          enableReinitialize={true}
          initialValues={{
            ...invoice,
          }}
          onSubmit={(values: Invoice) => {
            console.log('submit', values);
            dispatch(saveInvoice(values));
          }}
        >
          <Form>
            <div>
              <h3>Details</h3>
              <div>
                <StandardInputContainer>
                  <label htmlFor="title">Title</label>
                  <Field id="title" name="title" placeholder="Invoice Title" />
                </StandardInputContainer>
                <StandardInputContainer>
                  <label htmlFor="description">Description</label>
                  <Field
                    id="description"
                    name="description"
                    placeholder="Invoice Description"
                  />
                </StandardInputContainer>
                <StandardInputContainer>
                  <label htmlFor="status">Status</label>
                  <Field as="select" id="status" name="status">
                    {Object.values(InvoiceStatus).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Field>
                </StandardInputContainer>
              </div>
              <h3>Bill From</h3>
              <StandardInputContainer>
                <label htmlFor="billFromStreetAddress1">
                  Street Address First Line
                </label>
                <Field
                  id="billFromStreetAddress1"
                  name="billFrom.address.streetAddressLine1"
                  placeholder="Street Address First Line"
                />
              </StandardInputContainer>
              <StandardInputContainer>
                <label htmlFor="billFromstreetAddress2">
                  Street Address Second Line
                </label>
                <Field
                  id="billFromstreetAddress2"
                  name="billFrom.address.streetAddressLine2"
                  placeholder="Street Address Second Line"
                />
              </StandardInputContainer>

              <StandardInputContainer>
                <label htmlFor="billFromCity">City</label>
                <Field
                  id="billFromCity"
                  name="billFrom.address.city"
                  placeholder="City"
                />
              </StandardInputContainer>
              <StandardInputContainer>
                <label htmlFor="billFromState">State</label>
                <Field
                  id="billFromState"
                  name="billFrom.address.state"
                  placeholder="State"
                />
              </StandardInputContainer>
              <StandardInputContainer>
                <label htmlFor="billFromPostCode">PostCode</label>
                <Field
                  id="billFromPostCode"
                  name="billFrom.address.postCode"
                  placeholder="Post/Zip Code"
                />
              </StandardInputContainer>
              <StandardInputContainer>
                <label htmlFor="billFromCountry">Country</label>
                <Field
                  id="billFromCountry"
                  name="billFrom.address.country"
                  placeholder="Country"
                />
              </StandardInputContainer>
            </div>
            <div>
              <h3>Bill To`</h3>
              <StandardInputContainer>
                <label htmlFor="billTofirstName">First Name</label>
                <Field
                  id="billTofirstName"
                  name="billTo.personalDetails.firstName"
                  placeholder="First Name"
                />
              </StandardInputContainer>
              <StandardInputContainer>
                <label htmlFor="billTofirstName">Last Name</label>
                <Field
                  id="billTofirstName"
                  name="billTo.personalDetails.lastName"
                  placeholder="Last Name"
                />
              </StandardInputContainer>
              <StandardInputContainer>
                <label htmlFor="billToEmail">Email</label>
                <Field
                  id="billToEmail"
                  name="billTo.personalDetails.email"
                  placeholder="Email Address"
                />
              </StandardInputContainer>
              {/* Address */}
              <StandardInputContainer>
                <label htmlFor="billToStreetAddress1">
                  Street Address First Line
                </label>
                <Field
                  id="billToStreetAddress1"
                  name="billTo.address.streetAddressLine1"
                  placeholder="Street Address First Line"
                />
              </StandardInputContainer>
              <StandardInputContainer>
                <label htmlFor="billTostreetAddress2">
                  Street Address Second Line
                </label>
                <Field
                  id="billTostreetAddress2"
                  name="billTo.address.streetAddressLine2"
                  placeholder="Street Address Second Line"
                />
              </StandardInputContainer>

              <StandardInputContainer>
                <label htmlFor="billToCity">City</label>
                <Field
                  id="billToCity"
                  name="billTo.address.city"
                  placeholder="City"
                />
              </StandardInputContainer>
              <StandardInputContainer>
                <label htmlFor="billToState">State</label>
                <Field
                  id="billToState"
                  name="billTo.address.state"
                  placeholder="State"
                />
              </StandardInputContainer>
              <StandardInputContainer>
                <label htmlFor="billToPostCode">PostCode</label>
                <Field
                  id="billToPostCode"
                  name="billTo.address.postCode"
                  placeholder="Post/Zip Code"
                />
              </StandardInputContainer>
              <StandardInputContainer>
                <label htmlFor="billToCountry">Country</label>
                <Field
                  id="billToCountry"
                  name="billTo.address.country"
                  placeholder="Country"
                />
              </StandardInputContainer>
            </div>

            <div>
              <h3>Item List</h3>
              {invoice.items.map((item, index) => (
                <div key={index}>
                  <Field
                    id={`${item.name}-${index}`}
                    name={`items[${index}].name`}
                  />
                  <Field
                    id={`quantity-${index}`}
                    name={`items[${index}].quantity`}
                  />
                  <Field id={`price-${index}`} name={`items[${index}].price`} />
                  <div>{+item.price * item.quantity}</div>
                  <div>
                    <button>Remove</button>
                  </div>
                </div>
              ))}
              <button>Add</button>
            </div>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </InvoiceFormContainer>
    )
  );
};

interface InvoiceDisplayProps {
  invoice: Invoice;
}

const InvoiceDisplay: React.FC<InvoiceDisplayProps> = ({ invoice }) => {
  return (
    <div>
      <h1>{invoice.title}</h1>
      <InvoiceEditForm invoice={invoice} />
    </div>
  );
};

const createEmptyInvoice = (): Invoice => {
  const invoice = {} as unknown as Invoice;
  return invoice;
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
