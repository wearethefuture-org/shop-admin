import React, { useState } from 'react';

import UsersTable from '../Tables/Users/UsersTable';
import useUsers from '../../hooks/useUsers';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { LinearProgress } from '@material-ui/core';

enum cols {
  id = 'ID',
  createdAt = 'Створено',
  phone = 'Телефон',
  email = 'Email',
  telegramId = 'Телеграм',
  name = `Ім'я`,
  role = 'Роль',
}

let initialActiveColumns: string[] = [
  cols.id,
  cols.createdAt,
  cols.phone,
  cols.email,
  cols.telegramId,
  cols.name,
  cols.role,
]

const UsersContainer: React.FC = () => {
  const { data } = useUsers();
  let currentPage = 1;
  if (sessionStorage.getItem('usersCurrentPage')) {
    currentPage = Number(sessionStorage.getItem('usersCurrentPage'));
  }
  return (
    <div>
      <UsersTable list={data} currentPage={currentPage} />
    </div>
  );
};

export default UsersContainer;
