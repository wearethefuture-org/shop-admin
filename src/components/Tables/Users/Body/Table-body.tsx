import React, {useState} from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import {Box, Button} from '@material-ui/core';

import {IUserItem} from '../../../../interfaces/IUsers';
import DateMoment from '../../../Common/Date-moment';
import UserDialog from "../../../Modals/UserDialog/UserDialog";
import UserRemoveDialog from "../../../Modals/UserRemoveDialog/UserRemoveDialog";


interface TableBodyProps {
    rows: IUserItem[],
    rowsPerPage: number,
    page: number,
    emptyRows: number
}


const UsersTableBody: React.FC<TableBodyProps> = ({rows, rowsPerPage, page, emptyRows}) => {
    const [userDialogIsOpen, setUserDialogIsOpen] = useState(false);
    const [removeUserDialogIsOpen, setRemoveUserDialogIsOpen] = useState(false);

    const userDialogClose = () => {
        setUserDialogIsOpen(false)
    }
    const removeUserDialogClose = () => {
        setRemoveUserDialogIsOpen(false)
    }
    const [modalParams, setModalParams] = useState();
    const [modalRemoveParams, setModalRemoveParams] = useState();


    const openDialogNewUser = () => {
        setUserDialogIsOpen(true)
        setModalParams({
            isNew: true,
            user: null,
            closeModal: userDialogClose
        })
    }
    const openDialogUserCard = (event) => {
        setUserDialogIsOpen(true)
        setModalParams({
            isNew: false,
            user: rows[event.currentTarget.value],
            closeModal: userDialogClose
        })
    }
    const openDialogRemoveUser = (event) => {
        setRemoveUserDialogIsOpen(true)
        setModalRemoveParams({
            user: rows[event.currentTarget.value],
            closeModal: removeUserDialogClose
        })
    }

    return (
        <TableBody>
            {(rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
            ).map((row, key) => (
                <TableRow key={row.id}>
                    <TableCell component="th" scope="row">{row.id}</TableCell>
                    <TableCell align="right">{row.firstName}</TableCell>
                    <TableCell align="right">{row.lastName}</TableCell>
                    <TableCell align="right"><DateMoment date={row.createdAt}/></TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.role.name}</TableCell>
                    <TableCell align="right">
                        <Box display="flex">
                            <Box><Button variant="contained" size="small" value={key}
                                         onClick={openDialogUserCard}>Edit</Button></Box>
                            <Box pl={1}><Button variant="contained" size="small" color="secondary" value={key}
                                                onClick={openDialogRemoveUser}>Delete</Button></Box>
                        </Box>
                    </TableCell>
                </TableRow>
            ))}
            {emptyRows > 0 && (
                <TableRow style={{height: 53 * emptyRows}}>
                    <TableCell colSpan={6}/>
                </TableRow>
            )}
            <TableRow>
                <TableCell>
                    <Button
                        onClick={openDialogNewUser}
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon/>}>
                        Add user
                    </Button>
                    {userDialogIsOpen ? <UserDialog {...modalParams}/> : <div/>}
                    {removeUserDialogIsOpen ? <UserRemoveDialog {...modalRemoveParams}/> : <div/>}
                </TableCell>
            </TableRow>
        </TableBody>
    );
}

export default UsersTableBody;
