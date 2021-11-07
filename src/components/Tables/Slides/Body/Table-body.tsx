import React, { useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { Switch } from '@material-ui/core';

import { ISlideItem, SlideTableData } from '../../../../interfaces/ISlides';

import {
  fetchDeleteSlides,
  fetchUpdateSlideVisibility,
} from '../../../../store/actions/slides.actions';
import FormDialog from '../../../Modals/Slide-modal-edit';
import { Dispatch } from 'redux';
import { root } from '../../../../api/config';
import AddIcon from '@material-ui/icons/Add';
import { ISlidesModal } from '../../../../interfaces/modals';

interface TableBodyProps {
  rows: SlideTableData[];
  rowsPerPage: number;
  page: number;
  emptyRows: number;
  data: Array<ISlideItem>;
  dispatch: Dispatch;
  modalData: ISlidesModal;
}

const SlideTableBody: React.FC<TableBodyProps> = ({
  rows,
  rowsPerPage,
  page,
  emptyRows,
  data,
  dispatch,
  modalData,
}) => {
  const [selected, setSelected] = useState(null);

  const { handleClickOpen } = modalData;

  const changeShown = (id: number, isShown: boolean) => {
    const row = rows.find((x) => x.id === id);
    if (row) {
      dispatch(fetchUpdateSlideVisibility({ id: row.id, isShown: isShown }));
    }
  };

  const createSlideModalData = (id: any) => {
    const handleClickOpen = () => {
      setSelected(id);
    };

    const handleClose = () => {
      setSelected(null);
    };

    return {
      handleClickOpen,
      handleClose,
      isOpened: selected === id,
    };
  };

  const handleClickDelete = (item: SlideTableData) => {
    dispatch(fetchDeleteSlides(item));
  };

  return (
    <TableBody>
      {(rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row) => (
        <TableRow key={row.id}>
          <>
            <TableCell classes={{ root: 'row-table-id' }} component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="left">{row.name}</TableCell>
            <TableCell align="left">{row.text}</TableCell>
            <TableCell>
              <img width="50px" src={`${root}/static/uploads/${row.image}`} alt="" />
            </TableCell>
            <TableCell>
              <img width="50px" src={`${root}/static/uploads/${row.imageMobile}`} alt="" />
            </TableCell>
            <TableCell>{row.href}</TableCell>
            <TableCell>
              <Switch checked={row.isShown} onChange={() => changeShown(row.id, !row.isShown)} />
            </TableCell>
            <TableCell>{row.priority}</TableCell>
            <TableCell align="right">
              <FormDialog
                dispatch={dispatch}
                slidesLength={data.length}
                modalData={createSlideModalData(row.id)}
                row={row}
              />
            </TableCell>
            <TableCell align="right">
              <Button variant="contained" color="secondary" onClick={() => handleClickDelete(row)}>
                <DeleteIcon />
              </Button>
            </TableCell>
          </>
        </TableRow>
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
      <TableRow>
        <TableCell colSpan={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Add slide
          </Button>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default SlideTableBody;
