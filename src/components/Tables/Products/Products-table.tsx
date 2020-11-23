import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import ProductsTableHeader from './Header/Table-header';
import ProductsTableBody from './Body/Table-body';
import ProductsTableFooter from './Footer/Table-footer';
import { CircularProgress } from '@material-ui/core';
import { IProductItem } from '../../../interfaces/IProducts';


interface ProductsDataProps {
  data: Array<IProductItem>,
}

const useTableStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const ProductsTable: React.FC<ProductsDataProps> = ({ data }) => {
  const classes = useTableStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  if (!data) return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <ProductsTableHeader />
        </Table>
      </TableContainer>
      <CircularProgress />
    </div>
  );

  const rows: Array<IProductItem> = data.map((product: any) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    discount: product.discount,
    category: product.category
  }))
    .sort((a, b) => (a.id - b.id));

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <ProductsTableHeader />
        <ProductsTableBody
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          emptyRows={emptyRows}
        />
        <ProductsTableFooter
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
      </Table>
    </TableContainer>
  );
}


export default ProductsTable;