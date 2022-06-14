import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InvoicesTable from '../../components/Tables/Invoices/InvoicesTable';
import { fetchInvoicesList } from '../../store/actions/invoice.actions';
import { RootState } from '../../store/store';

const Invoices = () => {
  const dispatch = useDispatch();
  const invoiceData = useSelector((state: RootState) => state.invoice);

  async function fetchData() {
    await dispatch(fetchInvoicesList());
  }

  useEffect(() => {
    if (invoiceData.invoicesList.length === 0) {
      fetchData();
      if (invoiceData.invoicesList.length !== 0) {
        const invoices = invoiceData.invoicesList.map((i) => {
          return { ...i.invoiceFile };
        });
      }
    }
  }, [invoiceData.invoicesList]);

  return (
    <InvoicesTable
      data={invoiceData.invoicesList.map((i) => {
        return { ...i.invoiceFile };
      })}
      dispatch={dispatch}
    />
  );
};

export default Invoices;
