import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const ProductsTableHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell align="right">Name</TableCell>
        <TableCell align="right">Price</TableCell>
        <TableCell align="right">Description</TableCell>
        <TableCell align="right">Category</TableCell>
        <TableCell align="right">CreatedAt</TableCell>
        <TableCell align="right">UpdatedAt</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default ProductsTableHeader;