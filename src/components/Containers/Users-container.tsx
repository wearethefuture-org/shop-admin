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
  name = "Ім'я",
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

  const { paginationPage, paginationPageSearch, count, searchValue } = useSelector((state: RootState) => state.users);

  const { list, loading, isSearch } = useUsers(paginationPage, paginationPageSearch, searchValue);

    const [activeColumns, setActiveColumns] = useState<string[]>(initialActiveColumns);
  
  return (
    <div>
      {loading && <LinearProgress />}
      {list && <UsersTable
        list={list}
        activeColumns={activeColumns}
        isSearch={isSearch}
        searchValue={searchValue}
        count={count}
        paginationPage={isSearch ? paginationPageSearch : paginationPage}
      />}
  </div>
  )
};

export default UsersContainer;
