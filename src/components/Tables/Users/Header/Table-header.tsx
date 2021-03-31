import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const TableHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell align="right">Ім'я</TableCell>
        <TableCell align="right">Прізвище</TableCell>
        <TableCell align="right">Створений</TableCell>
        <TableCell align="right">email</TableCell>
        <TableCell align="right">Роль</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
