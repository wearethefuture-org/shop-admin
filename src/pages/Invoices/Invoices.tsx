import { createStyles, makeStyles, Theme, ThemeOptions } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InvoicesTable from '../../components/Tables/Invoices/InvoicesTable';
import useInvoices from '../../hooks/useInvoices';
import { RootState } from '../../store/store';

const useStyles = makeStyles(
  (theme: Theme): ThemeOptions =>
    createStyles({
      tableWrapper: {
        padding: theme.spacing(2),
      },
    })
);

const Invoices = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { invoiceList } = useInvoices();
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <div className={classes.tableWrapper}>
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
        darkMode={darkMode}
      />
    </div>
  );
};

export default Invoices;
