import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';

import TableHeader from './Header/Table-header';
import CategoryTableBody from './Body/Table-body';
import CategoryTableFooter from './Footer/Table-footer';
import { ICategoryItem, ICategoryItemResponse } from '../../../interfaces/ICategory';
import { CategoryTableData } from '../../../interfaces/ICategory';

interface CategoryDataProps {
  data: Array<ICategoryItemResponse>;
}

function createData(
  id: number,
  key: string,
  createdAt: string,
  updatedAt: string,
  name: string,
  products: Array<ICategoryItem>
) {
  return {
    id,
    key,
    name,
    createdAt,
    updatedAt,
    products: products.length,
  };
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

  if (!data.length)
    return (
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHeader />
          </Table>
        </TableContainer>
      </div>
    );

  const rows: Array<CategoryTableData> = data.map((category: ICategoryItemResponse) => {
    if (!category.products) category.products = [];

    return createData(
      category.id,
      category.key,
      category.createdAt,
      category.updatedAt,
      category.name,
      category.products
    );
  });
  rows.sort((a, b) => a.id - b.id);

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
};

export default CategoriesTable;
