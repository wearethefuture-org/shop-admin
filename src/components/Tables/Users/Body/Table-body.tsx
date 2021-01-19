import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import { Box, Button } from '@material-ui/core';

import { IUserItem } from '../../../../interfaces/Users';
import DateMoment from '../../../Common/Date-moment';


interface TableBodyProps {
  rows: IUserItem[],
  rowsPerPage: number,
  page: number,
  emptyRows: number
}

const UsersTableBody: React.FC<TableBodyProps> = ({ rows, rowsPerPage, page, emptyRows }) => {
  return (
    <TableBody>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row) => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">{row.id}</TableCell>
          <TableCell align="right"><DateMoment date={row.createdAt} /></TableCell>
          <TableCell align="right"><DateMoment date={row.updatedAt} /></TableCell>
          <TableCell align="right">{row.email}</TableCell>
          <TableCell align="right">{row.password}</TableCell>
          <TableCell align="right">{row.role}</TableCell>
          <TableCell align="right">
            <Box display="flex">
              <Box><Button variant="contained" size="small">Edit</Button></Box>
              <Box pl={1}><Button variant="contained" size="small" color="secondary">Delete</Button></Box>
            </Box>
          </TableCell>
        </TableRow>
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
      <TableRow>
        <TableCell>
          <Button variant="contained" color="primary" startIcon={<AddIcon/>}>Add user</Button>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default UsersTableBody;