import React, { useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/GetApp';
import DescriptionIcon from '@material-ui/icons/Description';
import Button from '@material-ui/core/Button';

import { IInvoiceFile } from '../../../../interfaces/IInvoice';
import { Dispatch } from 'redux';
import { generateInvoiceRequest } from '../../../../store/actions/invoice.actions';
import InvoiceRemoveDialog from '../../../Modals/InvoiceRemoveDialog.tsx/InvoiceRemoveDialog';
import DateMoment from '../../../Common/Date-moment';
import AddBtn from '../../../AddBtn/AddBtn';
import { makeStyles } from '@material-ui/core';
import { COLORS } from '../../../../values/colors';
import classNames from 'classnames';

interface TableBodyProps {
  rows: IInvoiceFile[];
  rowsPerPage: number;
  page: number;
  emptyRows: number;
  dispatch: Dispatch;
  darkMode: boolean;
}

const useStyles = makeStyles({
  button: {
    'background': 'transparent',
    'border': 'none',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    cursor: 'pointer',
    transition: '0.3s all',
  },
  downloadIcon: {
    'color': COLORS.primaryGreen,
    '&:hover': {
      color: COLORS.secondaryGreen,
    },
  },
  downloadIconDark: {
    'color': COLORS.darkGreen,
    '&:hover': {
      color: COLORS.secondaryDarkGreen,
    },
  },
  deleteIcon: {
    'color': COLORS.primaryRed,
    '&:hover': {
      color: COLORS.secondaryRed,
    },
  },
  deleteIconDark: {
    'color': COLORS.darkRed,
    '&:hover': {
      color: COLORS.secondaryDarkRed,
    },
  },
  fileIcon: {
    'color': COLORS.primaryGreen,
    '&:hover': {
      color: COLORS.secondaryGreen,
    },
  },
  fileIconDark: {
    'color': COLORS.darkGreen,
    '&:hover': {
      color: COLORS.secondaryDarkGreen,
    },
  },
});

const InvoiceTableBody: React.FC<TableBodyProps> = ({
  rows,
  rowsPerPage,
  page,
  emptyRows,
  dispatch,
  darkMode,
}) => {
  const classes = useStyles();
  const [removeInvoiceDialogIsOpen, setRemoveInvoiceDialogIsOpen] = useState<boolean>(false);
  const [modalRemoveParams, setModalRemoveParams] = useState<any>();

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
    window.location.reload();
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
              <DescriptionIcon
                fontSize="small"
                className={classNames(
                  classes.icon,
                  darkMode ? classes.fileIconDark : classes.fileIcon
                )}
              />
              {row.name.slice(0, -5)}
            </TableCell>
            <TableCell align="left">
              <DateMoment date={row.createdAt} />
            </TableCell>
            <TableCell align="left">
              {row.name.indexOf('xlsx') !== -1 ? 'Аркуш Microsoft Excel' : null}
            </TableCell>
            <TableCell align="left">{row.fileSize} КБ</TableCell>
            <TableCell align="right">
              <Button className={classes.button}>
                <a href={`${process.env.REACT_APP_PROD_DOMAIN}/invoice/${row.name}`} download>
                  <DownloadIcon
                    className={classNames(
                      classes.icon,
                      darkMode ? classes.downloadIconDark : classes.downloadIcon
                    )}
                  />
                </a>
              </Button>
            </TableCell>
            <TableCell align="left">
              <Button value={row.name} className={classes.button} onClick={openDialogRemoveInvoice}>
                <DeleteIcon
                  className={classNames(
                    classes.icon,
                    darkMode ? classes.deleteIconDark : classes.deleteIcon
                  )}
                />
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
          <AddBtn title="Згенерувати інвойс" handleAdd={generateInvoice}></AddBtn>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default InvoiceTableBody;
