import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { IProductItem } from '../../../../interfaces/IProducts';
import DateMoment from '../../../Common/Date-moment';

interface TableBodyProps {
  rows: IProductItem[],
  rowsPerPage: number,
  page: number,
  emptyRows: number
}

const CategoryTableBody: React.FC<TableBodyProps> = ({ rows, rowsPerPage, page, emptyRows }) => {
  return (
    <TableBody>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row) => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">{row.id}</TableCell>
          <TableCell align="right">{row.name}</TableCell>
          <TableCell align="right"><DateMoment date={row.price} /></TableCell>
          <TableCell align="right"><DateMoment date={row.discount} /></TableCell>
          <TableCell align="right">{row.category}</TableCell>
        </TableRow>
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}

export default CategoryTableBody;