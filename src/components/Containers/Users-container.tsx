import React from 'react';

import UsersTable from '../Tables/Users/UsersTable';
import useUsers from '../../hooks/useUsers';

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
