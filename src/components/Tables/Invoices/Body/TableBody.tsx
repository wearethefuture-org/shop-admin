import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/GetApp';
import DescriptionIcon from '@material-ui/icons/Description';
import Button from '@material-ui/core/Button';

import { IInvoiceFile } from '../../../../interfaces/IInvoice';
import { Dispatch } from 'redux';
import { removeInvoiceRequest } from '../../../../store/actions/invoice.actions';

interface TableBodyProps {
  rows: IInvoiceFile[];
  rowsPerPage: number;
  page: number;
  emptyRows: number;
  dispatch: Dispatch;
}

const InvoiceTableBody: React.FC<TableBodyProps> = ({
  rows,
  rowsPerPage,
  page,
  emptyRows,
  dispatch,
}) => {
  const removeInvoice = async (name: string) => {
    await dispatch(removeInvoiceRequest(name));
  };

  return (
    <TableBody>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row) => (
        <TableRow key={row.id}>
          <>
            <TableCell classes={{ root: 'row-table-id' }} component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="left">
              <DescriptionIcon />
              {row.name}
            </TableCell>
            <TableCell align="left">{row.createdAt}</TableCell>
            <TableCell align="right">
              <Button variant="contained" color="secondary">
                <a href={`${process.env.REACT_APP_PROD_DOMAIN}/invoice/${row.name}`} download>
                  <DownloadIcon />
                </a>
              </Button>
            </TableCell>
            <TableCell align="right">
              <Button variant="contained" color="secondary" onClick={() => removeInvoice(row.name)}>
                <DeleteIcon />
              </Button>
            </TableCell>
          </>
        </TableRow>
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default InvoiceTableBody;
