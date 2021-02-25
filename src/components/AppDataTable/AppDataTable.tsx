import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import Card from '@material-ui/core/Card';

import { IProductItem } from '../../interfaces/IProducts';
import { RootState } from '../../store/store';

interface DataTableProps {
  columns: any[];
  data: IProductItem[];
  title: string;
}

const AppDataTable: React.FC<DataTableProps> = ({ data, columns, title }) => {
  const [list, setList] = useState<IProductItem[]>([]);

  const { darkMode } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const sortedList: IProductItem[] = data.length ? data.sort((a, b) => b.id - a.id) : [];
    setList(sortedList);
  }, [data]);

  return (
    <Card>
      <DataTable
        data={list}
        columns={columns}
        pagination
        title={title}
        paginationRowsPerPageOptions={[10, 30, 50, 100]}
        theme={darkMode ? 'dark' : 'default'}
      />
    </Card>
  );
};

export default AppDataTable;
