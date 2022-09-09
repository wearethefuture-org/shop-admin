import React, { useEffect, useState } from 'react';
import { Box, Button, createStyles, makeStyles, Theme, ThemeOptions } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import AppDataTable from '../../../components/AppDataTable/AppDataTable';
import UserDialog from '../../Modals/UserDialog/UserDialog';
import UserRemoveDialog from '../../Modals/UserRemoveDialog/UserRemoveDialog';
import { AppDispatch, RootState } from '../../../store/store';
import { getUsersByQueryRequest, getUsersRequest } from '../../../store/actions/users.actions';
import { UsersTableProps } from '../../../interfaces/IUsers';
import { COLORS } from '../../../values/colors';
import AddBtn from '../../AddBtn/AddBtn';
import classNames from 'classnames';
import { phoneNumberFormatter } from '../../../utils/phoneNumberFormatter';
import Preloader from '../../Preloader/Preloader';
import { cols } from '../../Containers/Users-container';

const useStyles = makeStyles(
  (theme: Theme): ThemeOptions =>
    createStyles({
      wrapper: {
        padding: theme.spacing(2),
      },
      button: {
        'background': 'transparent',
        'border': 'none',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
      icon: {
        cursor: 'pointer',
        transition: '0.3s all',
      },
      editIcon: {
        'color': COLORS.primaryBlue,
        '&:hover': {
          color: COLORS.secondaryBlue,
        },
      },
      editIconDark: {
        'color': COLORS.darkBlue,
        '&:hover': {
          color: COLORS.secondaryDarkBlue,
        },
      },
      deleteIcon: {
        'color': COLORS.primaryRed,
        '&:hover': {
          color: 'rgb(216, 0, 0)',
        },
      },
      deleteIconDark: {
        'color': COLORS.darkRed,
        '&:hover': {
          color: COLORS.secondaryDarkRed,
        },
      },
    })
);

type QueryTypes = {
  page?: string;
  limit?: string;
  sort?: string;
  sortDirect?: string;
};

const UsersTable: React.FC<UsersTableProps> = ({ list, activeColumns, isSearch, paginationPage }) => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const { paginationLimit, sort, sortDirect, count, searchValue, loading } = useSelector(
    (state: RootState) => state.users
  );
  const defaultSortFieldId = Object.keys(cols).indexOf(sort) + 1;

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

    dispatch(getUsersRequest(actualPage, actualLimit, actualSort, actualSortDirect));
  }, []);

  useEffect(() => {
    const querySearch = {} as QueryTypes;

    if (!!paginationPage && paginationPage !== 1) querySearch.page = String(paginationPage);
    if (!!paginationLimit && paginationLimit !== 10) querySearch.limit = String(paginationLimit);
    if (!!sort && sort !== 'id') querySearch.sort = sort;
    if (!!sortDirect && sortDirect !== 'asc') querySearch.sortDirect = sortDirect;

    history.push({
      pathname: '/users',
      search: queryString.stringify(querySearch),
      state: { update: true },
    });
  }, [paginationPage, paginationLimit, sort, sortDirect]);

  const onChangePage = (page) => {
    if (isSearch) {
      dispatch(getUsersByQueryRequest(searchValue!, page, paginationLimit));
      return;
    }
    if (paginationPage !== page) dispatch(getUsersRequest(page, paginationLimit, sort, sortDirect));
  };

  const onChangeLimit = (limit) => {
    const newPage = Math.ceil(((paginationPage - 1) * paginationLimit + 1) / limit);

    if (isSearch) {
      dispatch(getUsersByQueryRequest(searchValue!, paginationPage, limit));
      return;
    }
    dispatch(getUsersRequest(newPage, limit, sort, sortDirect));
  };

  const setSortColumn = (column: any, direction: any) => {
    const fieldName = Object.keys(cols)[Object.values(cols).indexOf(column.name)];
    dispatch(getUsersRequest(paginationPage, paginationLimit, fieldName, direction));
  };

  const [userDialogIsOpen, setUserDialogIsOpen] = useState(false);
  const [confirmRemoveUserIsOpen, setConfirmRemoveUserIsOpen] = useState(false);

  const userDialogClose = () => {
    setUserDialogIsOpen(false);
  };
  const removeUserDialogClose = () => {
    setConfirmRemoveUserIsOpen(false);
  };
  const [modalParams, setModalParams] = useState();
  const [modalRemoveParams, setModalRemoveParams] = useState();

  const openDialogNewUser = () => {
    setUserDialogIsOpen(true);
    setModalParams({
      isNew: true,
      user: null,
      closeModal: userDialogClose,
    });
  };
  const openDialogUserCard = (event) => {
    setUserDialogIsOpen(true);
    setModalParams({
      isNew: false,
      user: list.find((item) => item.id == event.currentTarget.value),
      closeModal: userDialogClose,
    });
  };
  const openDialogRemoveUser = (event) => {
    setConfirmRemoveUserIsOpen(true);
    setModalRemoveParams({
      user: list.find((item) => item.id == event.currentTarget.value),
      closeModal: removeUserDialogClose,
    });
  };

  const addUserBtn = (
    <Box>
      <AddBtn title="Створити" handleAdd={openDialogNewUser} />
      {userDialogIsOpen && <UserDialog {...modalParams} darkMode />}
      {confirmRemoveUserIsOpen && <UserRemoveDialog {...modalRemoveParams} />}
    </Box>
  );

  const userColumns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      maxWidth: '100px',
      minWidth: '60px',
      omit: !activeColumns.includes('ID'),
    },
    {
      name: 'Створено',
      selector: (row) => row.createdAt,
      sortable: true,
      id: 'created',
      format: (row) => {
        return new Date(row.createdAt).toLocaleDateString(undefined, {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        });
      },
      omit: !activeColumns.includes('Створено'),
    },
    {
      name: 'Телефон',
      selector: (row) => phoneNumberFormatter(row.phoneNumber),
      sortable: true,
      omit: !activeColumns.includes('Телефон'),
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      omit: !activeColumns.includes('Email'),
    },
    {
      name: 'TelegramId',
      selector: (row) => row.telegramId,
      omit: !activeColumns.includes('TelegramId'),
    },
    {
      name: "Ім'я",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
      omit: !activeColumns.includes(`Ім'я`),
    },
    {
      name: 'Роль',
      selector: (row) => row.role?.name,
      omit: !activeColumns.includes('Роль'),
    },
    {
      name: '',
      selector: (row) => row.id,
      cell: (row) => {
        return (
          <Box display="flex">
            <Button className={classes.button} value={row.id} onClick={openDialogUserCard}>
              <EditIcon
                className={classNames(classes.icon, darkMode ? classes.editIconDark : classes.editIcon)}
              />
            </Button>
            <Button className={classes.button} value={row.id} onClick={openDialogRemoveUser}>
              <DeleteIcon
                className={classNames(classes.icon, darkMode ? classes.deleteIconDark : classes.deleteIcon)}
              />
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <div className={classes.wrapper}>
      {loading ? (
        <Preloader />
      ) : (
        <AppDataTable
          data={list}
          columns={userColumns}
          title={addUserBtn}
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
    </div>
  );
};

export default UsersTable;
