import React, { useState } from 'react';

import UsersTable from '../Tables/Users/UsersTable';
import useUsers from '../../hooks/useUsers';
import { useHistory, useLocation } from 'react-router-dom';
import { LinearProgress, Typography } from '@material-ui/core';
import styles from './User.module.scss';

enum cols {
  id = 'ID',
  created = 'Створено',
  phone = 'Телефон',
  email = 'Email',
  telegram = 'TelegramId',
  name = 'Ім\'я',
  role = 'Роль',
}

let initialActiveColumns: string[] = [
  cols.id,
  cols.created,
  cols.phone,
  cols.email,
  cols.telegram,
  cols.name,
  cols.role,
]

const UsersContainer: React.FC = () => {
  const history = useHistory();
  const { searchValue } = Object(history.location.state);

  const { list, loading, isSearch } = useUsers();

  const [activeColumns, setActiveColumns] = useState<string[]>(initialActiveColumns);

  

  return (
  <div>
    {loading && <LinearProgress />}
    {list?.map((user) => {
      if (searchValue === user.email) {
      return  <UsersTable
      list={list}
      activeColumns={activeColumns}
      isSearch={isSearch}
      searchValue={searchValue}
    />
      } return <Typography variant="h6" className={styles.title}>
        Користувача з email "{searchValue}" не існуе</Typography>
    })}
  </div>
  )
};

export default UsersContainer;
