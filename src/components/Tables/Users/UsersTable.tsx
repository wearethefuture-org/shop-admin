import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import AppDataTable from '../../../components/AppDataTable/AppDataTable';
import UserDialog from '../../Modals/UserDialog/UserDialog';
import UserRemoveDialog from '../../Modals/UserRemoveDialog/UserRemoveDialog';
import { AppDispatch, RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOrdersRequest } from '../../../store/actions/orders.actions';
import { getUsersRequest } from '../../../store/actions/users.actions';

const UsersTable = ({ list }) => {

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
  const [removeUserDialogIsOpen, setRemoveUserDialogIsOpen] = useState(false);

  const userDialogClose = () => {
    setUserDialogIsOpen(false);
  };
  const removeUserDialogClose = () => {
    setRemoveUserDialogIsOpen(false);
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
      user: list.find(item => item.id == event.currentTarget.value),
      closeModal: userDialogClose,
    });
  };
  const openDialogRemoveUser = (event) => {
    setRemoveUserDialogIsOpen(true);
    setModalRemoveParams({
      user: list.find(item => item.id == event.currentTarget.value),
      closeModal: removeUserDialogClose,
    });
  };

  const addUserBtn = (
    <Box>
      <Button
        onClick={openDialogNewUser}
        variant="contained"
        color="primary"
        startIcon={<AddIcon/>}
      >
        Створити
      </Button>
      {userDialogIsOpen && <UserDialog {...modalParams} />}
      {removeUserDialogIsOpen && <UserRemoveDialog {...modalRemoveParams} />}
    </Box>
  )

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
      name: 'Картка',
      selector: (row) => row.creditCard,
    },
    {
      name: 'Ім\'я',
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
      sortable: true,
      cell: (row) => {
        return (
          <Box display="flex">
            <Box>
              <Button variant="contained" size="small" value={row.id} onClick={openDialogUserCard}>
                Редагувати
              </Button>
            </Box>
            <Box pl={1}>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                value={row.id}
                onClick={openDialogRemoveUser}
              >
                Видалити
              </Button>
            </Box>
          </Box>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <AppDataTable
        data={list}
        columns={userColumns}
        title={addUserBtn}
        count={count}
        setLimit={(e) => onChangeLimit(e)}
        setPage={(e) => onChangePage(e)}
        paginationServer={true}
        defaultSortFieldId={'created'}
      />
    </React.Fragment>
  );
};

export default UsersTable;
