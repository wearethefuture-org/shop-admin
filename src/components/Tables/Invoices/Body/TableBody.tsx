import React, { useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/GetApp';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import { IInvoiceFile } from '../../../../interfaces/IInvoice';
import { Dispatch } from 'redux';
import { generateInvoiceRequest } from '../../../../store/actions/invoice.actions';
import InvoiceRemoveDialog from '../../../Modals/InvoiceRemoveDialog.tsx/InvoiceRemoveDialog';

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
  const [removeInvoiceDialogIsOpen, setRemoveInvoiceDialogIsOpen] = useState(false);
  const [modalRemoveParams, setModalRemoveParams] = useState();

  const removeUserDialogClose = () => {
    setRemoveInvoiceDialogIsOpen(false);
  };

  const openDialogRemoveInvoice = (event) => {
    setRemoveInvoiceDialogIsOpen(true);
    setModalRemoveParams({
      invoiceName: event.currentTarget.value,
      closeModal: removeUserDialogClose,
    });
  };

  const generateInvoice = async () => {
    await dispatch(generateInvoiceRequest());
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
              <Button
                value={row.name}
                variant="contained"
                color="secondary"
                onClick={openDialogRemoveInvoice}
              >
                <DeleteIcon />
              </Button>
            </TableCell>
            {removeInvoiceDialogIsOpen && <InvoiceRemoveDialog {...modalRemoveParams} />}
          </>
        </TableRow>
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
      <TableRow>
        <TableCell colSpan={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => generateInvoice()}
          >
            Generate invoice
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default InvoiceTableBody;
