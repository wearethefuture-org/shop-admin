import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import {TableContainer} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';

import {IUserItem} from '../../../interfaces/IUsers';
import UsersTableHeader from './Header/Table-header';
import UsersTableBody from './Body/Table-body';
import UsersTableFooter from './Footer/Table-footer';

interface UsersDataProps {
    data: Array<IUserItem>,
}

const useTableStyles = makeStyles({
    table: {
        minWidth: 500,
    },
});

const UsersTable: React.FC<UsersDataProps> = ({data}) => {
    const classes = useTableStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    if (!data) return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <UsersTableHeader/>
                </Table>
            </TableContainer>
        </div>
    );

    const rows: Array<IUserItem> = data.map((user: any) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        creditCard: user.creditCard,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
        password: user.password,
        tel: user.tel,
        role: user.role
    })).sort((a, b) => (a.id - b.id));

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
                <UsersTableHeader/>
                <UsersTableBody
                    rows={rows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    emptyRows={emptyRows}
                />
                <UsersTableFooter
                    rows={rows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    setPage={setPage}
                    setRowsPerPage={setRowsPerPage}
                />
            </Table>
        </TableContainer>
    );
}

export default UsersTable;
