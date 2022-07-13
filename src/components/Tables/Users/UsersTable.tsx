import React, { useState } from 'react';
import { Box, Button, createStyles, makeStyles, Theme, ThemeOptions } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AppDataTable from '../../../components/AppDataTable/AppDataTable';
import UserDialog from '../../Modals/UserDialog/UserDialog';
import UserRemoveDialog from '../../Modals/UserRemoveDialog/UserRemoveDialog';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersByQueryRequest, getUsersRequest } from '../../../store/actions/users.actions';
import { UsersTableProps } from '../../../interfaces/IUsers';
import { COLORS } from '../../../values/colors';
import AddBtn from '../../AddBtn/AddBtn';
import classNames from 'classnames';

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

const UsersTable: React.FC<UsersTableProps> = ({
  list,
  activeColumns,
  isSearch,
  searchValue,
  count,
  paginationPage,
}) => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const onChangePage = (page) => {
    setPage(page);

    if (isSearch) {
      dispatch(getUsersByQueryRequest(searchValue, page, limit));
      return;
    }
    dispatch(getUsersRequest(page, limit));
  };

  const onChangeLimit = (limit) => {
    setLimit(limit);

    if (isSearch) {
      dispatch(getUsersByQueryRequest(searchValue, page, limit));
      return;
    }
    dispatch(getUsersRequest(page, limit));
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
      selector: (row) => row.phoneNumber,
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
                className={classNames(
                  classes.icon,
                  darkMode ? classes.editIconDark : classes.editIcon
                )}
              />
            </Button>
            <Button className={classes.button} value={row.id} onClick={openDialogRemoveUser}>
              <DeleteIcon
                className={classNames(
                  classes.icon,
                  darkMode ? classes.deleteIconDark : classes.deleteIcon
                )}
              />
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <div className={classes.wrapper}>
      <AppDataTable
        data={list}
        columns={userColumns}
        title={addUserBtn}
        count={count}
        setLimit={(e) => onChangeLimit(e)}
        setPage={(e) => onChangePage(e)}
        paginationServer={true}
        paginationPage={paginationPage}
        defaultSortFieldId={'created'}
        customStyles={{
          cells: {
            style: { cursor: 'default' },
          },
        }}
      />
    </div>
  );
};

export default UsersTable;
