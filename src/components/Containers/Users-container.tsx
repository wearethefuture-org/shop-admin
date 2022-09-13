import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@material-ui/core';

import UsersTable from '../Tables/Users/UsersTable';
import { RootState } from '../../store/store';

export enum cols {
  id = 'ID',
  createdAt = 'Створено',
  phoneNumber = 'Телефон',
  email = 'Email',
  telegramId = 'Телеграм',
  firstName = `Ім'я`,
  role = 'Роль',
}

let initialActiveColumns: string[] = [
  cols.id,
  cols.createdAt,
  cols.phoneNumber,
  cols.email,
  cols.telegramId,
  cols.firstName,
  cols.role,
];

const UsersContainer: React.FC = () => {
  const { paginationPage, paginationPageSearch, list, loading, isSearch } = useSelector(
    (state: RootState) => state.users
  );
  const [activeColumns, setActiveColumns] = useState<string[]>(initialActiveColumns);

  return (
    <div>
      {loading && <LinearProgress />}
      {list && (
        <UsersTable
          list={list}
          activeColumns={activeColumns}
          isSearch={isSearch}
          paginationPage={isSearch ? paginationPageSearch : paginationPage}
        />
      )}
    </div>
  );
};

export default UsersContainer;
