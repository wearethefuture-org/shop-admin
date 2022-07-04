import { LinearProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import ColumnsMenu from '../../components/ColumnsMenu/ColumnsMenu';
import CustomConfirm from '../../components/CustomConfirm/CustomConfirm';
import FeedbacksTable from '../../components/Tables/Feedbacks/FeedbacksTable';
import useFeedbacks from '../../hooks/useFeedbacks';
import { deleteFeedbackRequest, getFeedbacksRequest } from '../../store/actions/feedbacks.actions';
import { AppDispatch } from '../../store/store';
import styles from './FeedbacksPage.module.scss';

enum feedbacksColumns {
  id = 'ID',
  authorIP = 'IP-адреса',
  text = 'Відгук',
  author = 'Автор',
  createdAt = 'Створено',
  updatedAt = 'Оновлено',
}

export default function FeedbacksPage() {
  const dispatch: AppDispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { list, count, loading } = useFeedbacks(currentPage, limit);

  React.useEffect(() => {
    if (!list.length && count){
      dispatch(getFeedbacksRequest(currentPage, limit));
    }
  }, [list]);

  const [showColumnsMenu, setShowColumnsMenu] = useState<boolean>(false);
  const [activeColumns, setActiveColumns] = useState<string[]>([
    feedbacksColumns.id,
    feedbacksColumns.authorIP,
    feedbacksColumns.text,
    feedbacksColumns.author,
    feedbacksColumns.createdAt,
    feedbacksColumns.updatedAt,
  ]);

  const handleColumns = (column: string) =>
    activeColumns.includes(column)
      ? setActiveColumns(activeColumns.filter((col) => col !== column))
      : setActiveColumns([...activeColumns, column]);

  const [openDeleteFeedbackDialog, setOpenDeleteFeedbackDialog] = useState<boolean>(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState<number>(0);

  const handleDeleteFeedback = () => {
    feedbackToDelete && dispatch(deleteFeedbackRequest(feedbackToDelete));
    setOpenDeleteFeedbackDialog(false);
  };

  return (
    <>
      {loading && <LinearProgress />}

      {openDeleteFeedbackDialog && (
        <CustomConfirm
          openDeleteDialog={openDeleteFeedbackDialog}
          closeDeleteDialog={() => setOpenDeleteFeedbackDialog(false)}
          name="відгук"
          warning="Ця операція є незворотньою. Дані буде неможливо відновити"
          handleDelete={handleDeleteFeedback}
        />
      )}

      <div className={styles.container}>
        {showColumnsMenu && (
          <ColumnsMenu
            allColumns={feedbacksColumns}
            activeColumns={activeColumns}
            showColumnsMenu={showColumnsMenu}
            setShowColumnsMenu={setShowColumnsMenu}
            handleColumns={handleColumns}
          />
        )}

        <div className={styles['header-btn-wrapper']}>
          <ColumnsBtn handleClick={() => setShowColumnsMenu(true)} />
        </div>
        <div className={styles['table-wrapper']}>
          {list && (
            <FeedbacksTable
              list={list}
              activeColumns={activeColumns}
              setOpenDeleteFeedbackDialog={setOpenDeleteFeedbackDialog}
              setFeedbackToDelete={setFeedbackToDelete}
              count={count}
              setPage={setCurrentPage}
              limit={limit}
              setLimit={setLimit}
              paginationServer={true}
            />
          )}
        </div>
      </div>
    </>
  );
}
