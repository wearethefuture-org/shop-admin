import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const TableHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell align="left">URL key</TableCell>
        <TableCell align="left">Name</TableCell>
        <TableCell align="left">Created At</TableCell>
        <TableCell align="left">Updated At</TableCell>
        <TableCell align="left">Products amount</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
