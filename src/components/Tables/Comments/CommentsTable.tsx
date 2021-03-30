import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { CommentsTableProps } from '../../../interfaces/IComment';
import AppDataTable from '../../AppDataTable/AppDataTable';
import DateMoment from '../../Common/Date-moment';
import styles from './CommentsTable.module.scss';

const CommentsTable: React.FC<CommentsTableProps> = ({
  list,
  activeColumns,
  setOpenDeleteCommentDialog,
  setCommentToDelete,
  count,
  limit,
  setLimit,
  paginationServer,
  setPage,
}) => {
  const [expandedComments, setExpandedComments] = useState<number[]>([]);

  const handleExpandedComments = (id) => {
    expandedComments.includes(id)
      ? setExpandedComments(expandedComments.filter((commentId) => commentId !== id))
      : setExpandedComments(expandedComments.concat(id));
  };

  const commentsColumns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      maxWidth: '7%',
      minWidth: '5%',
      omit: !activeColumns.includes('ID'),
    },
    {
      name: 'Відгук',
      selector: (row) => row.text,
      wrap: true,
      format: (row) =>
        row.text.length <= 100 ? (
          <p>{row.text}</p>
        ) : (
          <p className={styles.comment}>
            {!expandedComments.includes(row.id) ? (
              <span>{row.text.slice(0, 100)}...</span>
            ) : (
              <span>{row.text}</span>
            )}
            <span className={styles['expand-btn']} onClick={() => handleExpandedComments(row.id)}>
              {expandedComments.includes(row.id) ? 'Менше' : 'Повністю'}
            </span>
          </p>
        ),
      omit: !activeColumns.includes('Відгук'),
    },
    {
      name: 'Автор',
      selector: (row) => `${row.author.firstName} ${row.author.lastName}`,
      wrap: true,
      sortable: true,
      maxWidth: '20%',
      omit: !activeColumns.includes('Автор'),
    },
    {
      name: 'ID продукту',
      selector: (row) => row.product.id,
      sortable: true,
      maxWidth: '11%',
      omit: !activeColumns.includes('ID продукту'),
    },
    {
      name: 'Створено',
      selector: (row) => row.createdAt,
      sortable: true,
      maxWidth: '10%',
      format: (row) => <DateMoment date={row.createdAt} />,
      omit: !activeColumns.includes('Створено'),
    },
    {
      name: 'Оновлено',
      selector: (row) => row.updatedAt,
      sortable: true,
      maxWidth: '10%',
      format: (row) => <DateMoment date={row.updatedAt} />,
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
            setOpenDeleteCommentDialog(true);
            setCommentToDelete(row.id);
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
          columns={commentsColumns}
          title="Відгуки"
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

export default CommentsTable;
