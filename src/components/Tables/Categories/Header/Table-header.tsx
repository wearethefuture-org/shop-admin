import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const TableHeader:React.FC = () => {
   return (
     <TableHead>
       <TableRow>
         <TableCell>ID</TableCell>
         <TableCell align="right">Name</TableCell>
         <TableCell align="right">Created At</TableCell>
         <TableCell align="right">Updated At</TableCell>
         <TableCell align="right">Products amount</TableCell>
       </TableRow>
     </TableHead>
   );
}

export default TableHeader;