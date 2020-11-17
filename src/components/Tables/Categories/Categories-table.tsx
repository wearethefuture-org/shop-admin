import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHeader from './Header/Categories-Table-header';
import CategoryTableBody from './Body/Categories-Table-body';
import CategoryTableFooter from './Footer/Categories-Table-footer';
import TableContainer from '@material-ui/core/TableContainer';
import { ICategoryItem } from '../../../interfaces/category-Item';
import { CategoryTableData } from '../../../interfaces/categories-data';


interface CategoryDataProps {
  data: Array<ICategoryItem>,
}


function createData(
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  products: Array<ICategoryItem>) {
  return { id, name, createdAt, updatedAt, products: products.length };
}

const useTableStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});


const CategoriesTable: React.FC<CategoryDataProps> = ({ data }) => {
  const classes = useTableStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  if (!data.length) return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHeader />
        </Table>
      </TableContainer>
      <CircularProgress />
    </div>
  );

  const rows: Array<CategoryTableData> = data.map((category: ICategoryItem) => {
    if (!category.products) category.products = [];

    return createData(
      category.id,
      category.createdAt,
      category.updatedAt,
      category.name,
      category.products
    )
  })
  rows.sort((a, b) => (a.id - b.id));

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHeader />
        <CategoryTableBody
          rows={rows}
          rowsPerPage={rowsPerPage}
          page={page}
          emptyRows={emptyRows}
        />
        <CategoryTableFooter
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


export default CategoriesTable;