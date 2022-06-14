import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';

import TableContainer from '@material-ui/core/TableContainer';
import { Dispatch } from 'redux';
import { ISlidesModal } from '../../../interfaces/modals';
import { IInvoiceFile } from '../../../interfaces/IInvoice';
import InvoiceTableBody from './Body/TableBody';
import InvoiceTableFooter from './Footer/TableFooter';
import InvoiceTableHeader from './Header/TableHeader';

interface InvoiceDataProps {
  data: Array<IInvoiceFile>;
  dispatch: Dispatch;
  modalData?: ISlidesModal;
}

function createData(id: number, createdAt: string, updatedAt: string, name: string) {
  return { id, name, createdAt, updatedAt };
}

const useTableStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const InvoicesTable: React.FC<InvoiceDataProps> = ({ data, dispatch, modalData }) => {
  const classes = useTableStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows: Array<IInvoiceFile> = data.map((slide: IInvoiceFile) => {
    return createData(slide.id, slide.createdAt, slide.updatedAt, slide.name);
  });

  //   rows.sort((a, b) => b.createdAt - a.createdAt);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <InvoiceTableHeader />
        <InvoiceTableBody
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          emptyRows={emptyRows}
          dispatch={dispatch}
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
  );
};

export default InvoicesTable;
