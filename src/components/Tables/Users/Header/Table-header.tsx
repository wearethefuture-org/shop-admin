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
        <TableCell align="right">Email</TableCell>
        <TableCell align="right">Номер</TableCell>
        <TableCell align="right">Роль</TableCell>
        <TableCell align="right">TelegramId</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
