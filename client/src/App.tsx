import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoiceList } from './store/Invoices/actions';
import { RootState } from './store/';
import { InvoiceState } from './store/Invoices/interfaces';

function App() {
  const dispatch = useDispatch();
  const { isLoading, invoiceList } = useSelector<RootState>(
    (state) => state.invoices,
  ) as InvoiceState;
  useEffect(() => {
    dispatch(getInvoiceList());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
