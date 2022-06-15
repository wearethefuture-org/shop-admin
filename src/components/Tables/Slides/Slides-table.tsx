import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { Switch, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { TableColumn } from 'react-data-table-component';
import AppDataTable from '../../../components/AppDataTable/AppDataTable';
import { ISlideItem } from '../../../interfaces/ISlides';
import { ISlidesModal } from '../../../interfaces/modals';
import { root } from '../../../api/config';
import FormDialog from '../../Modals/Slide-modal-edit';
import {
  fetchDeleteSlides,
  fetchUpdateSlideVisibility,
} from '../../../store/actions/slides.actions';

interface SlideDataProps {
  data: Array<ISlideItem>;
  dispatch: Dispatch;
  modalData: ISlidesModal;
}

const SlidesTable: React.FC<SlideDataProps> = ({ data, dispatch, modalData }) => {
  const { handleClickOpen } = modalData;
  const [selected, setSelected] = useState(null);

  const changeShown = (id: number, isShown: boolean) => {
    const row = data.find((x) => x.id === id);
    if (row) {
      dispatch(fetchUpdateSlideVisibility({ id: row.id, isShown: isShown }));
    }
  };

  const createSlideModalData = (id: any) => {
    const handleClickOpen = () => setSelected(id);
    const handleClose = () => setSelected(null);
    return {
      handleClickOpen,
      handleClose,
      isOpened: selected === id,
    };
  };

  const handleClickDelete = (item: ISlideItem) => dispatch(fetchDeleteSlides(item));

  const title = (
    <div style={{ display: 'flex' }}>
      Слайди
      <Button
        style={{ marginLeft: 'auto' }}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Додати слайд
      </Button>
    </div>
  );

  const slideColumns: TableColumn<ISlideItem>[] = [
    {
      name: 'ID',
      selector: (row) => row.id,
      width: '8%',
    },
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Text',
      selector: (row) => row.text,
    },
    {
      name: 'Image',
      selector: (row) => row.image,
      cell: (row) => <img width="50px" src={`${root}/static/uploads/${row.image}`} alt="" />,
    },
    {
      name: 'Image Mobile',
      selector: (row) => row.imageMobile,
      cell: (row) => <img width="50px" src={`${root}/static/uploads/${row.imageMobile}`} alt="" />,
    },
    {
      name: 'Href',
      selector: (row) => row.href,
    },
    {
      name: 'IsShown',
      selector: (row) => row.isShown,
      cell: (row) => (
        <Switch checked={row.isShown} onChange={() => changeShown(row.id, !row.isShown)} />
      ),
    },
    {
      name: 'Priority',
      selector: (row) => row.priority,
      sortable: true,
    },
    {
      name: '',
      selector: (row) => row.id,
      cell: (row) => (
        <FormDialog
          dispatch={dispatch}
          slidesLength={data.length}
          modalData={createSlideModalData(row.id)}
          row={row}
        />
      ),
    },
    {
      name: '',
      selector: (row) => row.id,
      cell: (row) => (
        <Button variant="contained" color="secondary" onClick={() => handleClickDelete(row)}>
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  return (
    <React.Fragment>
      <AppDataTable
        data={data}
        title={title}
        columns={slideColumns}
        customStyles={{
          cells: {
            style: { cursor: 'default' },
          },
        }}
      />
    </React.Fragment>
  );
};

export default SlidesTable;
