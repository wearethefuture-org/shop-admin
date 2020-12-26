import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {CircularProgress} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';

import TableHeader from './Header/Table-header';
import SliderTableBody from './Body/Table-body';
import SliderTableFooter from './Footer/Table-footer';

import TableContainer from '@material-ui/core/TableContainer';
import {ISliderItem} from '../../../interfaces/slider-item';

import {SliderTableData} from '../../../interfaces/sliders-data';


interface SliderDataProps {
    data: Array<ISliderItem>,
}


function createData(
    id: number,
    createdAt: string,
    updatedAt: string,
    name: string,
    text: string,
    image: string,
    href: string,
    isShown: boolean,
    priority: number

) {
    return {id, name,  createdAt, updatedAt, text, image, href, isShown, priority};
}

const useTableStyles = makeStyles({
    table: {
        minWidth: 500,
    },
});


const SlidersTable: React.FC<SliderDataProps> = ({data}) => {
    const classes = useTableStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    if (!data.length) return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="custom pagination table">
                    <TableHeader/>
                </Table>
            </TableContainer>
            <CircularProgress/>
        </div>
    );

    const rows: Array<SliderTableData> = data.map((slider: ISliderItem) => {

        return createData(
            slider.id,
            slider.createdAt,
            slider.updatedAt,
            slider.name,
            slider.text,
            slider.image,
            slider.href,
            slider.isShown,
            slider.priority
        )
    })

    rows.sort((a, b) => (a.priority - b.priority));

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
                <TableHeader/>
                <SliderTableBody
                    rows={rows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    emptyRows={emptyRows}
                />
                <SliderTableFooter
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


export default SlidersTable;