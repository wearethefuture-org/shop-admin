import React, { useState } from 'react';
import { Dispatch } from 'redux';
import {
  Switch,
  Box,
  makeStyles,
  Theme,
  createStyles,
  ThemeOptions,
  alpha,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
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
import { COLORS } from '../../../values/colors';
import AddBtn from '../../AddBtn/AddBtn';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import classNames from 'classnames';
import SliderAnimations from '../../SliderAnimations/SliderAnimations';

interface SlideDataProps {
  data: Array<ISlideItem>;
  dispatch: Dispatch;
  modalData: ISlidesModal;
}

const useStyles = makeStyles(
  (theme: Theme): ThemeOptions =>
    createStyles({
      switch: {
        '& .MuiSwitch-switchBase.Mui-checked': {
          'color': COLORS.primaryGreen,
          '&:hover': {
            backgroundColor: alpha(COLORS.primaryGreen, theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: COLORS.primaryGreen,
        },
        'marginLeft': 'auto',
      },
      switchDark: {
        '& .MuiSwitch-switchBase.Mui-checked': {
          'color': COLORS.darkGreen,
          '&:hover': {
            backgroundColor: alpha(COLORS.darkGreen, theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: COLORS.darkGreen,
        },
        'marginLeft': 'auto',
      },
      icon: {
        cursor: 'pointer',
        transition: '0.3s all',
      },
      iconLight: {
        'color': COLORS.primaryRed,
        '&:hover': {
          color: COLORS.secondaryRed,
        },
      },
      iconDark: {
        'color': COLORS.darkRed,
        '&:hover': {
          color: COLORS.secondaryDarkRed,
        },
      },
    })
);

const SlidesTable: React.FC<SlideDataProps> = ({ data, dispatch, modalData }) => {
  const classes = useStyles();
  const { handleClickOpen } = modalData;
  const [selected, setSelected] = useState(null);
  const { darkMode } = useSelector((state: RootState) => state.theme);

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
      <Box
        component="div"
        sx={{
          display: 'flex',
          marginLeft: 'auto',
        }}
      >
        <SliderAnimations />
        <AddBtn
          style={{ height: '40px', lineHeight: '17px', margin: '10px 0 0 10px', width: '120px' }}
          title="Додати слайд"
          handleAdd={handleClickOpen}
        ></AddBtn>
      </Box>
    </div>
  );

  const slideColumns: TableColumn<ISlideItem>[] = [
    {
      name: 'IД',
      selector: (row) => row.id,
      width: '10%',
    },
    {
      name: 'Назва',
      selector: (row) => row.name,
      width: '10%',
    },
    {
      name: 'Опис',
      selector: (row) => row.text,
      width: '10%',
    },
    {
      name: 'Зображення',
      selector: (row) => row.image,
      cell: (row) => <img width="50px" src={`${root}/static/uploads/${row.image}`} alt="" />,
      width: '10%',
    },
    {
      name: 'Зображення на телефоні',
      selector: (row) => row.imageMobile,
      cell: (row) => <img width="50px" src={`${root}/static/uploads/${row.imageMobile}`} alt="" />,
      width: '10%',
    },
    {
      name: 'Посилання',
      selector: (row) => row.href,
      width: '10%',
    },
    {
      name: 'Відображати',
      selector: (row) => row.isShown,
      cell: (row) => (
        <Switch
          className={darkMode ? classes.switchDark : classes.switch}
          checked={row.isShown}
          onChange={() => changeShown(row.id, !row.isShown)}
        />
      ),
      center: true,
      width: '6%',
    },
    {
      name: 'Пріоритет',
      selector: (row) => row.priority,
      sortable: true,
      center: true,
      width: '6%',
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
          darkMode={darkMode}
        />
      ),
      center: true,
      width: '10%',
    },
    {
      name: '',
      selector: (row) => row.id,
      cell: (row) => (
        <DeleteIcon
          className={classNames(classes.icon, darkMode ? classes.iconDark : classes.iconLight)}
          onClick={() => handleClickDelete(row)}
        />
      ),
      center: true,
      width: '10%',
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
