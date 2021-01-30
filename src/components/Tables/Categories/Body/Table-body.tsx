import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import DateMoment from '../../../Common/Date-moment';
import { CategoryTableData } from '../../../../interfaces/categories-data';

interface TableBodyProps {
  rows: CategoryTableData[];
  rowsPerPage: number;
  page: number;
  emptyRows: number;
}

const CategoryTableBody: React.FC<TableBodyProps> = ({ rows, rowsPerPage, page, emptyRows }) => {
  return (
    <TableBody>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row) => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell align="left" scope="row">
            /{row.key}
          </TableCell>
          <TableCell align="left">{row.name}</TableCell>
          <TableCell align="left">
            <DateMoment date={row.createdAt} />
          </TableCell>
          <TableCell align="left">
            <DateMoment date={row.updatedAt} />
          </TableCell>
          <TableCell align="left">{row.products}</TableCell>
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

export default CategoryTableBody;
