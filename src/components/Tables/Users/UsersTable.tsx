import React, { useState } from 'react';
import { Box, Button, createStyles, makeStyles, Theme, ThemeOptions } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import AppDataTable from '../../../components/AppDataTable/AppDataTable';
import UserDialog from '../../Modals/UserDialog/UserDialog';
import UserRemoveDialog from '../../Modals/UserRemoveDialog/UserRemoveDialog';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersRequest } from '../../../store/actions/users.actions';
import { IUserItem } from '../../../interfaces/IUsers';
import { COLORS } from '../../../values/colors';

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
      createUserBtn: {
        'borderRadius': '30px',
        'backgroundColor': COLORS.primaryBlue,
        '&:hover': {
          backgroundColor: COLORS.secondaryBlue,
        },
      },
      editIcon: {
        'cursor': 'pointer',
        'color': COLORS.primaryBlue,
        'transition': '0.3s all',

        '&:hover': {
          color: COLORS.secondaryBlue,
        },
      },
      deleteIcon: {
        'cursor': 'pointer',
        'color': 'red',
        'transition': '0.3s all',

        '&:hover': {
          color: 'rgb(216, 0, 0)',
        },
      },
    })
);

const UsersTable = ({ list }: { list: IUserItem[] }) => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const count = useSelector((state: RootState) => state.users.count);

  const onChangePage = (page) => {
    setPage(page);
    dispatch(getUsersRequest(page, limit));
  };

  const onChangeLimit = (limit) => {
    setLimit(limit);
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
      <Button
        className={classes.createUserBtn}
        onClick={openDialogNewUser}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
      >
        Створити
      </Button>
      {userDialogIsOpen && <UserDialog {...modalParams} />}
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
    },
    {
      name: 'Телефон',
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'TelegramId',
      selector: (row) => row.telegramId,
    },
    {
      name: "Ім'я",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
    },
    {
      name: 'Роль',
      selector: (row) => row.role?.name,
    },
    {
      name: '',
      selector: (row) => row.id,
      cell: (row) => {
        return (
          <Box display="flex">
            <Button className={classes.button} value={row.id} onClick={openDialogUserCard}>
              <EditIcon className={classes.editIcon} />
            </Button>
            <Button className={classes.button} value={row.id} onClick={openDialogRemoveUser}>
              <DeleteIcon className={classes.deleteIcon} />
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
