import { Box, Button, LinearProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';

import ColumnsBtn from '../../components/ColumnsBtn/ColumnsBtn';
import ColumnsMenu from '../../components/ColumnsMenu/ColumnsMenu';
import CustomConfirm from '../../components/CustomConfirm/CustomConfirm';
import { AppDispatch } from '../../store/store';
import useDraws from '../../hooks/useDraws';
import { deleteDrawRequest } from '../../store/actions/draws.actions';
import DrawsTable from '../../components/Tables/Draws/DrawsTable';
import DrawDialog from '../../components/Modals/DrawDialog/DrawDialog';

import styles from './DrawsPage.module.scss';

enum drawsColumns {
  id = 'ID',
  text = 'Зміст',
  conditions = 'Умови розіграшу',
  totalAmount = 'Виділена сума',
  numOfWinners = 'Кількість призерів',
  createdAt = 'Створено',
  updatedAt = 'Оновлено',
}

export default function DrawsPage() {
  const dispatch: AppDispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [drawDialogIsOpen, setDrawDialogIsOpen] = useState(false);
  const [modalParams, setModalParams] = useState();

  const { list, count, loading } = useDraws(currentPage, limit);

  const [showColumnsMenu, setShowColumnsMenu] = useState<boolean>(false);
  const [activeColumns, setActiveColumns] = useState<string[]>([
    drawsColumns.id,
    drawsColumns.text,
    drawsColumns.conditions,
    drawsColumns.totalAmount,
    drawsColumns.numOfWinners,
    drawsColumns.createdAt,
    drawsColumns.updatedAt,
  ]);

  const handleColumns = (column: string) =>
    activeColumns.includes(column)
      ? setActiveColumns(activeColumns.filter((col) => col !== column))
      : setActiveColumns([...activeColumns, column]);

  const [openDeleteFeedbackDialog, setOpenDeleteFeedbackDialog] = useState<boolean>(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState<number>(0);

  const handleDeleteDraw = () => {
    feedbackToDelete && dispatch(deleteDrawRequest(feedbackToDelete));
    setOpenDeleteFeedbackDialog(false);
  };

  const drawDialogClose = () => {
    setDrawDialogIsOpen(false);
  };

  const openDialogNewDraw = () => {
    setDrawDialogIsOpen(true);
    setModalParams({
      isNew: true,
      draw: null,
      closeModal: drawDialogClose,
    });
  };

  const openDialogDrawCard = (rowId) => {
    console.log(rowId);
    setDrawDialogIsOpen(true);
    setModalParams({
      isNew: false,
      draw: list.find((item) => item.id == rowId),
      closeModal: drawDialogClose,
    });
  };

  const addDrawBtn = (
    <Box>
      <Button
        onClick={openDialogNewDraw}
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
      >
        Створити
      </Button>
      {drawDialogIsOpen && <DrawDialog {...modalParams} />}
    </Box>
  );

  return (
    <>
      {loading && <LinearProgress />}

      {openDeleteFeedbackDialog && (
        <CustomConfirm
          openDeleteDialog={openDeleteFeedbackDialog}
          closeDeleteDialog={() => setOpenDeleteFeedbackDialog(false)}
          name="розіграш"
          warning="Ця операція є незворотньою. Дані буде неможливо відновити"
          handleDelete={handleDeleteDraw}
        />
      )}

      <div className={styles.container}>
        <div className={styles.btnGroup}>
          <Box>
            <Button
              onClick={openDialogNewDraw}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Створити
            </Button>
            {drawDialogIsOpen && <DrawDialog {...modalParams} />}
            {/*{removeUserDialogIsOpen && <UserRemoveDialog {...modalRemoveParams} />}*/}
          </Box>

          {showColumnsMenu && (
            <ColumnsMenu
              allColumns={drawsColumns}
              activeColumns={activeColumns}
              showColumnsMenu={showColumnsMenu}
              setShowColumnsMenu={setShowColumnsMenu}
              handleColumns={handleColumns}
            />
          )}
          <div className={styles['header-btn-wrapper']}>
            <ColumnsBtn handleClick={() => setShowColumnsMenu(true)} />
          </div>
        </div>
        <div className={styles['table-wrapper']}>
          {list && (
            <DrawsTable
              list={list}
              openDialogDrawCard={openDialogDrawCard}
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
