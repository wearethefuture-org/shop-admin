import React, {useState} from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import {SliderTableData} from '../../../../interfaces/sliders-data';
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import useSliders from "../../../../hooks/useSliders";
import {fetchDeleteSliders, fetchUpdateSliders} from "../../../../store/actions";

import FormDialog from "../../../Modals/Slider-modal-edit";
import {Switch} from "@material-ui/core";

interface TableBodyProps {
    rows: SliderTableData[],
    rowsPerPage: number,
    page: number,
    emptyRows: number,

}

const SliderTableBody: React.FC<TableBodyProps> = ({
                                                       rows,
                                                       rowsPerPage,
                                                       page,
                                                       emptyRows,
                                                   }) => {
    const {data, dispatch} = useSliders();

    const [selected, setSelected] = useState(null);

    const changeShown = (id: number, isShown: boolean) => {
        const row = rows.find(x => x.id === id);
        console.log(isShown)
        if (row) {
            dispatch(fetchUpdateSliders(row.id, row.name, row.text, row.image as string, row.href, isShown, row.priority));
        }
    }

    const createSliderModalData = (id: any) => {

        const handleClickOpen = () => {
            setSelected(id);
        };

        const handleClose = () => {
            setSelected(null);
        };

        return {
            handleClickOpen,
            handleClose,
            isOpened: selected == id,
        };

    }

    const handleClickDelete = (item: SliderTableData) => {
        dispatch(fetchDeleteSliders(item))
    }

    return (
        <TableBody>
            {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows).map((row) => (
                <TableRow key={row.id}>

                    <>
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.text}</TableCell>
                        <TableCell align="right"><img width="50px" src={row.image as string}/></TableCell>
                        <TableCell align="right">{row.href}</TableCell>
                        <TableCell align="right"><Switch checked={row.isShown}
                                                         onChange={() => changeShown(row.id, !row.isShown)}/></TableCell>
                        <TableCell align="right">{row.priority}</TableCell>

                        <TableCell align="right">
                            <FormDialog
                                dispatch={dispatch}
                                slidersLength={data.length}
                                modalData={createSliderModalData(row.id)}
                                row={row}
                            />
                        </TableCell>

                        <TableCell align="right">
                            <Button variant="contained" color="primary" onClick={() => handleClickDelete(row)}>
                                <DeleteIcon/>
                            </Button>
                        </TableCell>
                    </>

                </TableRow>
            ))}
            {emptyRows > 0 && (
                <TableRow style={{height: 53 * emptyRows}}>
                    <TableCell colSpan={6}/>
                </TableRow>
            )}
        </TableBody>
    );
}

export default SliderTableBody;