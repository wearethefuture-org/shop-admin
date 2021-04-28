import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { IGetCategoriesResponse } from '../../../interfaces/ICategory';
import AppDataTable from '../../AppDataTable/AppDataTable';
import DateMoment from '../../Common/Date-moment';

interface CategoriesDataProps {
  list: IGetCategoriesResponse[];
  activeColumns: string[];
}

const CategoriesTable: React.FC<CategoriesDataProps> = ({ list, activeColumns }) => {
  const categoriesColumns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      maxWidth: '60px',
      minWidth: '60px',
      omit: !activeColumns.includes('ID'),
    },
    {
      name: 'Назва',
      selector: (row) => row.name,
      sortable: true,
      omit: !activeColumns.includes('Назва'),
    },
    {
      name: 'Головна категорія',
      selector: (row) => row.mainCategory.name,
      sortable: true,
      omit: !activeColumns.includes('Головна категорія'),
    },
    {
      name: 'Опис',
      selector: (row) => row.description,
      wrap: true,
      sortable: true,
      format: (row) =>
        row.description.length <= 100 ? row.description : `${row.description.slice(0, 100)}...`,
      omit: !activeColumns.includes('Опис'),
    },
    {
      name: 'URL ключ',
      selector: (row) => row.key,
      omit: !activeColumns.includes('URL ключ'),
    },
    {
      name: 'Створено',
      selector: (row) => row.createdAt,
      sortable: true,
      format: (row) => <DateMoment date={row.createdAt} />,
      omit: !activeColumns.includes('Створено'),
    },
    {
      name: 'Оновлено',
      selector: (row) => row.updatedAt,
      sortable: true,
      format: (row) => <DateMoment date={row.updatedAt} />,
      omit: !activeColumns.includes('Оновлено'),
    },
    {
      name: 'Кількість продуктів',
      selector: (row) => row.files,
      maxWidth: '110px',
      minWidth: '110px',
      format: (row) => <span>{row?.products?.length ? row?.products?.length : 0}</span>,
      omit: !activeColumns.includes('Кількість продуктів'),
    },
  ];

  const history = useHistory();
  const [sortedList, setSortedList] = useState<IGetCategoriesResponse[]>([]);

  useEffect(() => {
    const sortedList: IGetCategoriesResponse[] = list.length
      ? list.sort((a, b) => b.id - a.id)
      : [];
    setSortedList(sortedList);
  }, [list]);

  const onRowClicked = (id) => {
    history.push(`/category/${id}`);
  };

  return (
    <>
      {sortedList.length ? (
        <AppDataTable
          data={sortedList}
          columns={categoriesColumns}
          title="Під-Категорії"
          onRowClicked={(row) => onRowClicked(row.id)}
        />
      ) : null}
    </>
  );
};

export default CategoriesTable;
