import React from 'react';

import UsersTable from '../Tables/Users/Users-table';
import useUsers from '../../hooks/useUsers';

const UsersContainer: React.FC = () => {
  const { data } = useUsers();
  return <UsersTable data={data} />;
};

export default UsersContainer;
