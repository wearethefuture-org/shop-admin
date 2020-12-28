import React from 'react';
import UsersTable from '../Tables/Users/Users-table';

import useUsers from '../../hooks/useUsers';
import users from '../../mock/users';


const UsersContainer: React.FC = () => {
  let data = useUsers();
  data = users.concat()

  return <UsersTable data={data} />
}

export default UsersContainer;