import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';

import TableContainer from '@material-ui/core/TableContainer';
import { Dispatch } from 'redux';
import { IInvoiceFile } from '../../../interfaces/IInvoice';
import InvoiceTableBody from './Body/TableBody';
import InvoiceTableFooter from './Footer/TableFooter';
import InvoiceTableHeader from './Header/TableHeader';
import useModal from '../../../hooks/useModal';
import GenerateInvoiceModal from '../../Modals/GenerateInvoiceModal/GenerateInvoiceModal';

interface InvoiceDataProps {
  data: Array<IInvoiceFile>;
  dispatch: Dispatch;
  darkMode: boolean;
}

function createData(
  id: number,
  name: string,
  createdAt: string,
  updatedAt: string,
  fileSize: number,
  url?: string
) {
  return { id, name, createdAt, updatedAt, fileSize, url };
}

const useTableStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const InvoicesTable: React.FC<InvoiceDataProps> = ({ data, dispatch, darkMode }) => {
  const classes = useTableStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const generateInvoiceModalData = useModal();

  const rows: Array<IInvoiceFile> = data.map((invoice: IInvoiceFile) => {
    return createData(
      invoice.id,
      invoice.name,
      invoice.createdAt,
      invoice.updatedAt,
      invoice.fileSize,
      invoice.url
    );
  });

  rows.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <InvoiceTableHeader />
          <InvoiceTableBody
            rows={rows}
            rowsPerPage={rowsPerPage}
            page={page}
            emptyRows={emptyRows}
            dispatch={dispatch}
            darkMode={darkMode}
            modalData={generateInvoiceModalData}
          />
          <InvoiceTableFooter
            rows={rows}
            rowsPerPage={rowsPerPage}
            page={page}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
          />
        </Table>
      </TableContainer>
      <GenerateInvoiceModal dispatch={dispatch} modalData={generateInvoiceModalData}></GenerateInvoiceModal>
    </>
  );
};

export default InvoicesTable;
