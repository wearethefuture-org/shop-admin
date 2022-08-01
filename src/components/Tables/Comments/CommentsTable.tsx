import React, { useState } from 'react';
import { createStyles, IconButton, makeStyles, ThemeOptions } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { CommentsTableProps } from '../../../interfaces/IComment';
import AppDataTable from '../../AppDataTable/AppDataTable';
import DateMoment from '../../Common/Date-moment';
import styles from './CommentsTable.module.scss';
import { COLORS } from '../../../values/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import classNames from 'classnames';

const useStyles = makeStyles(
  (): ThemeOptions =>
    createStyles({
      icon: {
        cursor: 'pointer',
        transition: '0.3s all',
      },
      iconLight: {
        'color': COLORS.primaryRed,
        '&:hover': {
          color: COLORS.secondaryRed,
        },
      },
      iconDark: {
        'color': COLORS.darkRed,
        '&:hover': {
          color: COLORS.secondaryDarkRed,
        },
      },
    })
);

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
  const classes = useStyles();
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const { darkMode } = useSelector((state: RootState) => state.theme);

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
      name: 'Коментар',
      selector: (row) => row.text,
      wrap: true,
      format: (row) =>
        row.text.length <= 100 ? (
          <p className={styles.comment}>{row.text}</p>
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
          onClick={() => {
            setOpenDeleteCommentDialog(true);
            setCommentToDelete(row.id);
          }}
        >
          <DeleteIcon
            className={classNames(classes.icon, darkMode ? classes.iconDark : classes.iconLight)}
          />
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
          title="Коментарі"
          count={count}
          limit={limit}
          setLimit={setLimit}
          paginationServer={paginationServer}
          setPage={(e) => {
            sessionStorage.setItem('commentsCurrentPage', String(e));
            setPage(e);
          }}
          currentPage={
            sessionStorage.getItem('commentsCurrentPage')
              ? Number(sessionStorage.getItem('commentsCurrentPage'))
              : 1
          }
        />
      ) : null}
    </>
  );
};

export default CommentsTable;
