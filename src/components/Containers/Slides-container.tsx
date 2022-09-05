import React from 'react';
import { createStyles, makeStyles, Theme, ThemeOptions } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import SlideTable from '../Tables/Slides/Slides-table';
import FormDialog from '../Modals/Slide-modal';
import useSlidesModal from '../../hooks/useSlidesModal';
import { RootState } from '../../store/store';

const useStyles = makeStyles(
  (theme: Theme): ThemeOptions =>
    createStyles({
      tableWrapper: {
        padding: theme.spacing(2),
      },
    })
);

export enum cols {
  id = 'ID',
  name = 'Назва',
  text = 'Опис',
  image = 'Зображення',
  imageMobile = 'Зображення на телефоні',
  href = 'Посилання',
  isShown = 'Відображати',
  priority = 'Пріоритет',
}

const SlidesContainer: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { list: data } = useSelector((state: RootState) => state.slides);
  const slidesCreateModalData = useSlidesModal();

  return (
    <>
      <div className={classes.tableWrapper}>
        <SlideTable modalData={slidesCreateModalData} />
      </div>
      <FormDialog dispatch={dispatch} slidesLength={data.length} modalData={slidesCreateModalData} />
    </>
  );
};

export default SlidesContainer;
