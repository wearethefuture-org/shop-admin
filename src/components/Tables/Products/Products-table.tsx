import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import { LinearProgress } from '@material-ui/core';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import ProductsTableHeader from './Header/Table-header';
import ProductsTableBody from './Body/Table-body';
import ProductsTableFooter from './Footer/Table-footer';
import { IProductItem, ProductTableData } from '../../../interfaces/IProducts';
import { ICategoryItem } from '../../../interfaces/category-Item';

interface ProductsDataProps {
  list: Array<IProductItem>,
  loading: boolean
}
function createData(
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  price: number,
  description: string,
  category: Array<ICategoryItem>,) {
  return { id, name, createdAt, updatedAt, price, description, category };
}
const useTableStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

const ProductsTable: React.FC<ProductsDataProps> = ({ list, loading}) => {
  const classes = useTableStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);


  if (!list.length && loading) return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <ProductsTableHeader />
        </Table>
      </TableContainer>
      <LinearProgress />
    </div>
  );

  const rows: Array<ProductTableData> = list.map((product: IProductItem) => {
    return createData(
      product.id,
      product.createdAt,
      product.updatedAt,
      product.name,
      product.price,
      product.description,
      product.category.name
    )
  });
  rows.sort((a, b) => (a.id - b.id));
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