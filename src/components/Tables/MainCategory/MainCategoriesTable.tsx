import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { IGetMainCategoriesResponse } from '../../../interfaces/IMainCategory';
import AppDataTable from '../../AppDataTable/AppDataTable';
import DateMoment from '../../Common/Date-moment';

interface MainCategoriesDataProps {
  list: IGetMainCategoriesResponse[];
  activeColumns: string[];
}

const MainCategoriesTable: React.FC<MainCategoriesDataProps> = ({ list, activeColumns }) => {
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
      name: 'Кількість Під-категорій',
      selector: (row) => row.category,
      sortable: true,
      format: (row) => <span>{row?.category?.length ? row?.category?.length : 0}</span>,
      omit: !activeColumns.includes('Кількість Під-категорій'),
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
    
  ];

  const history = useHistory();
  const [sortedList, setSortedList] = useState<IGetMainCategoriesResponse[]>([]);

  useEffect(() => {
    const sortedList: IGetMainCategoriesResponse[] = list.length
      ? list.sort((a, b) => b.id - a.id)
      : [];
    setSortedList(sortedList);
  }, [list]);

  const onRowClicked = (id) => {
    history.push(`/mainCategory/${id}`);
  };

  return (
    <>
      {sortedList.length ? (
        <AppDataTable
          data={sortedList}
          columns={categoriesColumns}
          title="Головні Категорії"
          onRowClicked={(row) => onRowClicked(row.id)}
        />
      ) : null}
    </>
  );
};

export default MainCategoriesTable;
