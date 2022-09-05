import React, { useEffect, useState } from 'react';
import { Switch, Box, makeStyles, Theme, createStyles, ThemeOptions, alpha } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { TableColumn } from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import queryString from 'query-string';

import AppDataTable from '../../../components/AppDataTable/AppDataTable';
import { ISlideItem } from '../../../interfaces/ISlides';
import { ISlidesModal } from '../../../interfaces/modals';
import { root } from '../../../api/config';
import FormDialog from '../../Modals/Slide-modal-edit';
import {
  fetchDeleteSlides,
  fetchSlides,
  fetchUpdateSlideVisibility,
} from '../../../store/actions/slides.actions';
import { COLORS } from '../../../values/colors';
import AddBtn from '../../AddBtn/AddBtn';
import { RootState } from '../../../store/store';
import SliderAnimations from '../../SliderAnimations/SliderAnimations';
import Preloader from '../../Preloader/Preloader';
import { cols } from '../../Containers/Slides-container';

interface SlideDataProps {
  modalData: ISlidesModal;
}

type QueryTypes = {
  page?: string;
  limit?: string;
  sort?: string;
  sortDirect?: string;
};

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

const SlidesTable: React.FC<SlideDataProps> = ({  modalData }) => {
  const {
    list: data,
    count,
    paginationLimit,
    paginationPage,
    sort,
    sortDirect,
    loading,
  } = useSelector((state: RootState) => state.slides);
  const defaultSortFieldId = Object.keys(cols).indexOf(sort as string) + 1;
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const parsed = queryString.parse(location.search) as QueryTypes;
    let actualPage = paginationPage;
    if (parsed.page) actualPage = Number(parsed.page);
    let actualLimit = paginationLimit;
    if (parsed.limit) actualLimit = Number(parsed.limit);
    let actualSort = sort;
    if (parsed.sort) actualSort = parsed.sort;
    let actualSortDirect = sortDirect;
    if (parsed.sortDirect) actualSortDirect = parsed.sortDirect;
    dispatch(fetchSlides(actualPage, actualLimit, actualSort, actualSortDirect));
  }, []);

  useEffect(() => {
    const querySearch = {} as QueryTypes;
    if (!!paginationPage && paginationPage !== 1) querySearch.page = String(paginationPage);
    if (!!paginationLimit && paginationLimit !== 10) querySearch.limit = String(paginationLimit);
    if (!!sort && sort !== 'id') querySearch.sort = sort;
    if (!!sortDirect && sortDirect !== 'asc') querySearch.sortDirect = sortDirect;
    history.push({
      pathname: '/slides',
      search: queryString.stringify(querySearch),
      state: { update: true },
    });
  }, [paginationPage, paginationLimit, sort, sortDirect]);

  const onChangeLimit = (limit) => {
    const newPage = Math.ceil(((paginationPage - 1) * paginationLimit + 1) / limit);
    dispatch(fetchSlides(newPage, limit, sort, sortDirect));
  };

  const onChangePage = (page) => {
    if (paginationPage !== page) dispatch(fetchSlides(page, paginationLimit, sort, sortDirect));
  };

  const setSortColumn = (column: any, direction: any) => {
    const fieldName = Object.keys(cols)[Object.values(cols).indexOf(column.name)];
    dispatch(fetchSlides(paginationPage, paginationLimit, fieldName, direction));
  };

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
        <AddBtn style={{ margin: '10px' }} title="Додати слайд" handleAdd={handleClickOpen}></AddBtn>
      </Box>
    </div>
  );

  const slideColumns: TableColumn<ISlideItem>[] = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
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
    <>
      {loading ? (
        <Preloader />
      ) : (
        <AppDataTable
          data={data}
          columns={slideColumns}
          title={title}
          count={count}
          limit={paginationLimit}
          setLimit={(e) => onChangeLimit(e)}
          setPage={(e) => onChangePage(e)}
          setSortColumn={(column, direction) => setSortColumn(column, direction)}
          paginationServer={true}
          paginationPage={paginationPage}
          defaultSortFieldId={defaultSortFieldId}
          sortDirect={sortDirect}
          customStyles={{
            cells: {
              style: { cursor: 'default' },
            },
          }}
        />
      )}
    </>
  );
};

export default SlidesTable;
