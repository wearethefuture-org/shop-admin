import React from 'react';

import UsersTable from '../Tables/Users/UsersTable';
import useUsers from '../../hooks/useUsers';

const UsersContainer: React.FC = () => {
  const { data } = useUsers();
  return (
  <div>
    <UsersTable list={data} />
  </div>
  )
};

export default UsersContainer;
