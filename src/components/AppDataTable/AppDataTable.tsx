import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import Card from '@material-ui/core/Card';

import { RootState } from '../../store/store';

interface DataTableProps {
  columns: any[];
  data: any[];
  title: string;
  onRowClicked?: (row: any) => void;
  count?: number;
  limit?: number;
  setLimit?: Dispatch<SetStateAction<number>>;
  paginationServer?: boolean;
  setPage?: Dispatch<SetStateAction<number>>;
}

const AppDataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  title,
  onRowClicked = () => {},
  count,
  setPage = () => {},
  limit,
  setLimit = () => {},
  paginationServer = false,
}) => {
  const { darkMode } = useSelector((state: RootState) => state.theme);

  return (
    <Card>
      <DataTable
        data={data}
        columns={columns}
        title={title}
        theme={darkMode ? 'dark' : 'default'}
        highlightOnHover={true}
        onRowClicked={onRowClicked}
        pointerOnHover={true}
        pagination
        paginationTotalRows={count}
        paginationRowsPerPageOptions={[10, 30, 50, 100]}
        paginationServer={paginationServer}
        paginationPerPage={limit}
        onChangePage={(p) => setPage(p)}
        onChangeRowsPerPage={(l) => setLimit(l)}
        paginationComponentOptions={{
          rowsPerPageText: 'Рядків на сторінці:',
          rangeSeparatorText: 'з',
        }}
      />
    </Card>
  );
};

export default AppDataTable;
