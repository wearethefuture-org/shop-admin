import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


import DateMoment from '../../../Common/Date-moment';
import {ISlidersData, SliderTableData} from '../../../../interfaces/sliders-data';
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon  from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import useSliders from "../../../../hooks/useSliders";
import {fetchDeleteSliders} from "../../../../store/actions";

import Input from '@material-ui/core/Input';

interface TableBodyProps {
    rows: SliderTableData[],
    rowsPerPage: number,
    page: number,
    emptyRows: number,

}



const SliderTableBody:React.FC<TableBodyProps> = ({rows, rowsPerPage, page, emptyRows}) => {
    const { data, dispatch } = useSliders();
    const [idForEdit, setIdForEdit] = React.useState(-1)
    const handleClickDelete = (item: SliderTableData) => {
        dispatch(fetchDeleteSliders(item))
    }

    const handleClickUpdate = (item: SliderTableData) => {
setIdForEdit(item.id)


    }

    return (
        <TableBody>
            {(rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
            ).map((row) => (
                <TableRow key={row.id}>


                    {row.id !== idForEdit &&
                    (
                        <>
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right"><DateMoment date={row.createdAt}/></TableCell>
                        <TableCell align="right"><DateMoment date={row.updatedAt}/></TableCell>
                        <TableCell align="right">{row.text}</TableCell>
                        <TableCell align="right"><img width="50px" src={row.image}/></TableCell>
                        <TableCell align="right">{row.href}</TableCell>
                        <TableCell align="right">{row.isShown.toString()}</TableCell>
                        <TableCell align="right">{row.priority}</TableCell>
                        <TableCell align="right"><Button variant="contained" color="primary" onClick={() => handleClickUpdate(row)}>
                        <AddIcon />
                        </Button></TableCell>
                        <TableCell align="right">
                        <Button variant="contained" color="primary" onClick={() => handleClickDelete(row)}>
                        <DeleteIcon/>
                        </Button>
                        </TableCell>
                        </>
                    )}
                    {row.id === idForEdit &&
                    (
                        <>
                            <TableCell component="th" scope="row">{row.id}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right"><DateMoment date={row.createdAt}/></TableCell>
                            <TableCell align="right"><DateMoment date={row.updatedAt}/></TableCell>
                            <TableCell align="right">{row.text}</TableCell>
                            <TableCell align="right">{row.image}</TableCell>
                            <TableCell align="right"><Input defaultValue={row.href}/></TableCell>
                            <TableCell align="right">{row.isShown.toString()}</TableCell>
                            <TableCell align="right">{row.priority}</TableCell>
                            <TableCell align="right"><Button variant="contained" color="primary" >
                                <SaveIcon />
                            </Button></TableCell>
                            <TableCell align="right">
                                <Button variant="contained" color="primary" onClick={() => handleClickDelete(row)}>
                                    <DeleteIcon/>
                                </Button>
                            </TableCell>
                        </>
                    )}
                </TableRow>
            ))}
            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                </TableRow>
            )}
        </TableBody>
    );
}

export default SliderTableBody;