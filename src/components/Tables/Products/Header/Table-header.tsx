import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const tableHeaders = [
  'ID',
  'Назва',
  'Ціна',
  'Опис',
  'Категорія',
  'URL ключ',
  'Створено',
  'Обновлено',
  'Зображення продукта',
  'Головне зображення',
];

const ProductsTableHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        {tableHeaders.map((item) => (
          <TableCell key={item}>{item}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default ProductsTableHeader;
