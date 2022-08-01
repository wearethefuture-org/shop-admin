import React, { Dispatch, SetStateAction, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import Card from '@material-ui/core/Card';
import { customStylesDataTable } from './CustomStylesDataTable';
import CustomTablePaginator from '../Paginator/Paginator';

import { RootState } from '../../store/store';
import { COLORS } from '../../values/colors';

interface DataTableProps {
  columns: any[];
  data: any[];
  title: ReactElement<any> | string;
  onRowClicked?: (row: any) => void;
  count?: number;
  limit?: number;
  setLimit?: Dispatch<SetStateAction<number>>;
  paginationServer?: boolean;
  setPage?: Dispatch<SetStateAction<number>>;
  defaultSortFieldId?: string;
  customStyles?: any;
  currentPage?: number;
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
  defaultSortFieldId = '',
  paginationPage,
  customStyles = customStylesDataTable,
  currentPage,
}) => {
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const conditionalRowStyles = [
    {
      when: (row) => row.id,
      style: {
        'minHeight': '70px',
        '&:hover': {
          backgroundColor: darkMode ? COLORS.secondaryDarkGray : COLORS.primaryOttoman,
        },
      },
    },
  ];

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
        paginationDefaultPage={paginationPage}
        paginationComponent={CustomTablePaginator}
        paginationDefaultPage={currentPage}
        defaultSortAsc={false}
        defaultSortFieldId={defaultSortFieldId ? null : defaultSortFieldId}
        fixedHeader={true}
        fixedHeaderScrollHeight={'60vh'}
        paginationTotalRows={count}
        paginationRowsPerPageOptions={[2, 10, 30, 50, 100]}
        paginationServer={paginationServer}
        paginationPerPage={limit}
        onChangePage={(p) => setPage(p)}
        onChangeRowsPerPage={(l) => setLimit(l)}
        customStyles={customStyles}
        conditionalRowStyles={conditionalRowStyles}
      />
    </Card>
  );
};

export default AppDataTable;
