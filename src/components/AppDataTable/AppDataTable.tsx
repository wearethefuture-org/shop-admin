import React from 'react';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import Card from '@material-ui/core/Card';

import { RootState } from '../../store/store';

interface DataTableProps {
  columns: any[];
  data: any[];
  title: string;
  onRowClicked: (row: any) => void;
}

const AppDataTable: React.FC<DataTableProps> = ({ data, columns, title, onRowClicked }) => {
  const { darkMode } = useSelector((state: RootState) => state.theme);
  
  return (
    <Card>
      <DataTable
        data={data}
        columns={columns}
        pagination
        title={title}
        paginationRowsPerPageOptions={[10, 30, 50, 100]}
        theme={darkMode ? 'dark' : 'default'}
        highlightOnHover={true}
        onRowClicked={onRowClicked}
        pointerOnHover={true}
        paginationComponentOptions={{
          rowsPerPageText: 'Рядків на сторінці:',
          rangeSeparatorText: 'з',
        }}
      />
    </Card>
  );
};

export default AppDataTable;
