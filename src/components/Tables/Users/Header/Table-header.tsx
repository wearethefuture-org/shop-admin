import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const TableHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell align="right">Created at</TableCell>
        <TableCell align="right">Updated at</TableCell>
        <TableCell align="right">email</TableCell>
        <TableCell align="right">Role</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;