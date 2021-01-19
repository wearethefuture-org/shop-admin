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
import {fetchDeleteSliders, fetchUpdateSliders} from "../../../../store/actions";

import Input from '@material-ui/core/Input';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Switch, withStyles} from "@material-ui/core";;

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

    const handleClickSave = (item: SliderTableData) => {
        setIdForEdit(-1)
        dispatch(fetchUpdateSliders(item.id, item.name, item.text, item.image as string, item.href, item.isShown, item.priority))
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
                        <TableCell align="right"><img width="50px" src={row.image as string} /></TableCell>
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
                            <TableCell align="right">
                                <Input onChange={(e) => row.name = e.target.value} defaultValue={row.name}/>
                            </TableCell>
                            <TableCell align="right"><DateMoment date={row.createdAt}/></TableCell>
                            <TableCell align="right"><DateMoment date={row.updatedAt}/></TableCell>
                            <TableCell align="right">
                                <Input onChange={(e) => row.text = e.target.value} defaultValue={row.text}/>
                            </TableCell>
                            <TableCell>
                                    <div className="example-1">
                                        <div className="form-group">
                                            <label className="label">
                                                <span className="title">Add file</span>
                                                <Input
                                                    type="file"
                                                    onChange={(e)  => row.image = ((e.target as HTMLInputElement).files as FileList)[0]}
                                                />
                                            </label>
                                        </div>
                                    </div>
                            </TableCell>
                            <TableCell align="right">
                                <Input onChange={(e) => { row.href = e.target.value}} defaultValue={row.href}/>
                            </TableCell>
                            <TableCell>
                                <Typography component="div">
                                    <Grid component="label" container alignItems="center" spacing={1}>
                                        <Grid item>Disable</Grid>
                                        <Grid item>
                                            <Switch onChange={(e) => {row.isShown = e.target.checked}} defaultChecked={row.isShown} />
                                        </Grid>
                                        <Grid item>Enable</Grid>
                                    </Grid>
                                </Typography>
                            </TableCell>

                            <TableCell align="right">
                                <Input onChange={(e) => {row.priority  = +e.target.value}} defaultValue={row.priority}/>
                            </TableCell>

                            <TableCell align="right">
                                <Button variant="contained" color="primary" onClick={() => handleClickSave(row)}>
                                <SaveIcon />
                                </Button>
                            </TableCell>
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