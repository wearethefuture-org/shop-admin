import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AppDataTable from '../../AppDataTable/AppDataTable';
import DateMoment from '../../Common/Date-moment';
import styles from './DrawsTable.module.scss';
import { DrawsTableProps } from '../../../interfaces/IDraw';

const DrawsTable: React.FC<DrawsTableProps> = ({
  list,
  activeColumns,
  setOpenDeleteFeedbackDialog,
  setFeedbackToDelete,
  count,
  limit,
  setLimit,
  paginationServer,
  setPage,
  openDialogDrawCard,
}) => {
  const [expandedFeedbacks, setExpandedFeedbacks] = useState<number[]>([]);
  const handleExpandedFeedbacks = (id) => {
    expandedFeedbacks.includes(id)
      ? setExpandedFeedbacks(expandedFeedbacks.filter((feedbackId) => feedbackId !== id))
      : setExpandedFeedbacks(expandedFeedbacks.concat(id));
  };
  const feedbacksColumns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      maxWidth: '7%',
      minWidth: '5%',
      omit: !activeColumns.includes('ID'),
    },
    {
      name: 'Зміст',
      selector: (row) => row.text,
      wrap: true,
      format: (row) =>
        row.text.length <= 100 ? (
          <p className={styles.feedback}>{row.text}</p>
        ) : (
          <p className={styles.feedback}>
            {!expandedFeedbacks.includes(row.id) ? (
              <span>{row.text.slice(0, 100)}...</span>
            ) : (
              <span>{row.text}</span>
            )}
            <span className={styles['expand-btn']} onClick={() => handleExpandedFeedbacks(row.id)}>
              {expandedFeedbacks.includes(row.id) ? 'Менше' : 'Повністю'}
            </span>
          </p>
        ),
      omit: !activeColumns.includes('Зміст'),
    },
    {
      name: 'Умови розіграшу',
      selector: (row) => row.conditions,
      wrap: true,
      format: (row) =>
        row.text.length <= 100 ? (
          <p className={styles.feedback}>{row.conditions}</p>
        ) : (
          <p className={styles.feedback}>
            {!expandedFeedbacks.includes(row.id) ? (
              <span>{row.conditions.slice(0, 100)}...</span>
            ) : (
              <span>{row.conditions}</span>
            )}
            <span className={styles['expand-btn']} onClick={() => handleExpandedFeedbacks(row.id)}>
              {expandedFeedbacks.includes(row.id) ? 'Менше' : 'Повністю'}
            </span>
          </p>
        ),
      omit: !activeColumns.includes('Умови розіграшу'),
    },
    {
      name: 'Виділена сума',
      selector: (row) => row.totalAmount,
      sortable: true,
      maxWidth: '10%',
      minWidth: '5%',
      omit: !activeColumns.includes('Виділена сума'),
    },
    {
      name: 'Кількість призерів',
      selector: (row) => row.numOfWinners,
      sortable: true,
      maxWidth: '10%',
      minWidth: '5%',
      omit: !activeColumns.includes('Кількість призерів'),
    },
    {
      name: 'Створено',
      selector: (row) => row.createdAt,
      sortable: true,
      maxWidth: '10%',
      format: (row) => <DateMoment date={row.createdAt} column />,
      omit: !activeColumns.includes('Створено'),
    },
    {
      name: 'Оновлено',
      selector: (row) => row.updatedAt,
      sortable: true,
      maxWidth: '10%',
      format: (row) => <DateMoment date={row.updatedAt} column />,
      omit: !activeColumns.includes('Оновлено'),
    },
    {
      name: 'Видалити',
      maxWidth: '10%',
      cell: (row) => (
        <IconButton
          aria-label="delete"
          type="button"
          color="secondary"
          onClick={() => {
            setOpenDeleteFeedbackDialog(true);
            setFeedbackToDelete(row.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
    {
      name: 'Редагувати',
      maxWidth: '10%',
      cell: (row) => (
        <IconButton
          aria-label="delete"
          type="button"
          color="secondary"
          onClick={() => {
            openDialogDrawCard(row.id);
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      {list.length ? (
        <AppDataTable
          data={list}
          columns={feedbacksColumns}
          title="Розіграші"
          count={count}
          limit={limit}
          setLimit={setLimit}
          paginationServer={paginationServer}
          setPage={setPage}
        />
      ) : null}
    </>
  );
};

export default DrawsTable;
