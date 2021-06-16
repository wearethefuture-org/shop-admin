import { Box, Button } from '@material-ui/core';
import React from 'react';

import AppDataTable from '../../../components/AppDataTable/AppDataTable';

const OrdersTable = ({ list }) => {

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
      name: "Ім'я",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      sortable: true,
    },
    {
      name: '',
      selector: (row) => row.role.name,
      sortable: true,
      cell: (row) => {
        return (
          <Box display="flex">
            <Box>
              <Button variant="contained"
                size="small"
                onClick={() => console.log('edit')}>
                Редагувати
              </Button>
            </Box>
            <Box pl={1}>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => console.log('delete')}
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
        title="Користувачи"
        count={3232}
        defaultSortFieldId={'created'}
      />
    </React.Fragment>
  );
};

export default OrdersTable;
