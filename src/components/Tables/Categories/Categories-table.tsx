import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableHeader from './Header/Categories-Table-header';
import CategoryTableBody from './Body/Categories-Table-body';
import CategoryTableFooter from './Footer/Categories-Table-footer';
import { CircularProgress } from '@material-ui/core';

import { ICategoryItem } from '../../../interfaces/category-Item';


interface CategoryDataProps {
  data: Array<ICategoryItem>,
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


  if (!data) {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableHeader />
          </Table>
        </TableContainer>
        <CircularProgress style={{ textAlign: 'center', verticalAlign: 'middle', lineHeight: '100%' }} />
      </div>
    )
  };

  const rows: Array<ICategoryItem> = data.map((category: any) => ({
    id: category.id,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
    name: category.name,
    products: category.products.length
  }))
    .sort((a, b) => (a.id - b.id));

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