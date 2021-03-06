import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Card from '@material-ui/core/Card';

import { IProductItem } from '../../interfaces/IProducts';

interface DataTableProps {
  columns: any[];
  data: IProductItem[];
  title: string;
}

const AppDataTable: React.FC<DataTableProps> = ({ data, columns, title }) => {
  const [list, setList] = useState<IProductItem[]>([]);

  useEffect(() => {
    if (!data.length) return;

    const sortedList: IProductItem[] = data.sort((a, b) => b.id - a.id);
    setList(sortedList);
  }, [data]);

  return (
    <Card>
      <DataTable data={list} columns={columns} pagination title={title} />
    </Card>
  );
};

export default AppDataTable;
