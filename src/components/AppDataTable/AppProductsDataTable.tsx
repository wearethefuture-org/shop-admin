import React, { Dispatch, SetStateAction, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import Card from '@material-ui/core/Card';
import { customStylesDataTable } from './CustomStylesDataTable';
import CustomProductsTablePaginator from '../Paginator/ProductsPaginator';

import { RootState } from '../../store/store';
import { COLORS } from '../../values/colors';

interface ProductsDataTableProps {
  columns: any[];
  data: any[];
  title: ReactElement<any> | string;
  onRowClicked?: (row: any) => void;
  count?: number;
  limit?: number;
  setLimit?: Dispatch<SetStateAction<number>>;
  paginationServer?: boolean;
  defaultSortFieldId?: string | number | null;
  customStyles?: any;
  paginationPage?: number;
  setSortColumn?: (column: any, direction: any) => void;
  sortDirect: string;
}

const AppProductsDataTable: React.FC<ProductsDataTableProps> = ({
  data,
  columns,
  title,
  onRowClicked = () => {},
  count,
  limit,
  setLimit = () => {},
  setSortColumn = () => {},
  paginationServer = true,
  defaultSortFieldId = '',
  paginationPage,
  customStyles = customStylesDataTable,
  sortDirect,
}) => {
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const defaultSortAsc = sortDirect === 'asc' ? true : false;
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
        customStyles={customStyles}
        highlightOnHover={true}
        onRowClicked={onRowClicked}
        pointerOnHover={true}
        fixedHeader={true}
        fixedHeaderScrollHeight={'60vh'}
        pagination
        paginationDefaultPage={paginationPage}
        paginationComponent={CustomProductsTablePaginator}
        paginationTotalRows={count}
        paginationRowsPerPageOptions={[2, 10, 30, 50, 100]}
        paginationServer={paginationServer}
        paginationPerPage={limit}
        onChangeRowsPerPage={(l) => setLimit(l)}
        onSort={(e, direction) => setSortColumn(e, direction)}
        defaultSortAsc={defaultSortAsc}
        defaultSortFieldId={defaultSortFieldId}
        sortFunction={(rows) => rows}
        conditionalRowStyles={conditionalRowStyles}
      />
    </Card>
  );
};

export default AppProductsDataTable;
