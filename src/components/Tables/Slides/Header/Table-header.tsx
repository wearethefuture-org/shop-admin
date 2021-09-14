import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const TableHeader:React.FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Text</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Href</TableCell>
                <TableCell>IsShown</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    );
}

export default TableHeader;
