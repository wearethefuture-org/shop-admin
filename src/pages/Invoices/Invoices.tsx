import React from 'react';
import { useDispatch } from 'react-redux';
import InvoicesTable from '../../components/Tables/Invoices/InvoicesTable';
import useInvoices from '../../hooks/useInvoices';

const Invoices = () => {
  const dispatch = useDispatch();
  const { invoiceList } = useInvoices();

  return (
    <InvoicesTable
      data={invoiceList.map((i) => {
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
