import React, { useEffect } from 'react';
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
    }
  }, [invoiceData.invoicesList]);

  return (
    <InvoicesTable
      data={invoiceData.invoicesList.map((i) => {
        return {
          id: i.id,
          createdAt: i.createdAt,
          updatedAt: i.updatedAt,
          url: i.url,
          fileSize: i.fileSize,
          name: i.invoiceFile.name,
        };
      })}
      dispatch={dispatch}
    />
  );
};

export default Invoices;
