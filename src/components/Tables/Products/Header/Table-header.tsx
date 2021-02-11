import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
interface ITableHeader {
  tableHeaders: Array<string>
}
const ProductsTableHeader: React.FC<ITableHeader> = ({ tableHeaders }) => {
  return (
    <TableHead>
      <TableRow>
        {tableHeaders.map((item) => <TableCell key={item}>{item}</TableCell>)}
      </TableRow>
    </TableHead>
  );
}

export default ProductsTableHeader;
