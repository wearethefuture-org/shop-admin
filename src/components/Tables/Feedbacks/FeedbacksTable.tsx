import React, { useState } from 'react';
import { createStyles, IconButton, makeStyles, ThemeOptions } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { FeedbacksTableProps } from '../../../interfaces/IFeedback';
import AppDataTable from '../../AppDataTable/AppDataTable';
import DateMoment from '../../Common/Date-moment';
import styles from './FeedbacksTable.module.scss';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../values/colors';
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

const FeedbacksTable: React.FC<FeedbacksTableProps> = ({
  list,
  activeColumns,
  setOpenDeleteFeedbackDialog,
  setFeedbackToDelete,
  count,
  limit,
  setLimit,
  paginationServer,
  setPage,
}) => {
  const classes = useStyles();

  const { darkMode } = useSelector((state: RootState) => state.theme);

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
      name: 'IP-адреса',
      selector: (row) => row.authorIP,
      sortable: true,
      maxWidth: '15%',
      minWidth: '5%',
      omit: !activeColumns.includes('IP-адреса'),
    },
    {
      name: 'Відгук',
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
      omit: !activeColumns.includes('Відгук'),
    },
    {
      name: 'Автор',
      selector: (row) =>
        row.author
          ? `${row.author.firstName} ${row.author.lastName} [ID: ${row.author.id}]`
          : 'Анонімний користувач',
      wrap: true,
      sortable: true,
      maxWidth: '20%',
      omit: !activeColumns.includes('Автор'),
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
          className={classNames(classes.icon, darkMode ? classes.iconDark : classes.iconLight)}
          onClick={() => {
            setOpenDeleteFeedbackDialog(true);
            setFeedbackToDelete(row.id);
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

export default FeedbacksTable;
