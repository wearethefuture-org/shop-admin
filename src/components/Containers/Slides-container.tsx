import React from 'react';
import SlideTable from '../Tables/Slides/Slides-table';
import useSlides from '../../hooks/useSlides';
import FormDialog from '../Modals/Slide-modal';
import useSlidesModal from '../../hooks/useSlidesModal';
import { createStyles, makeStyles, Theme, ThemeOptions } from '@material-ui/core';

const useStyles = makeStyles(
  (theme: Theme): ThemeOptions =>
    createStyles({
      tableWrapper: {
        padding: theme.spacing(2),
      },
    })
);

const SlidesContainer: React.FC = () => {
  const classes = useStyles();
  const { data, dispatch } = useSlides();
  const slidesCreateModalData = useSlidesModal();

  return (
    <>
      <div className={classes.tableWrapper}>
        <SlideTable data={data} dispatch={dispatch} modalData={slidesCreateModalData} />
      </div>
      <FormDialog
        dispatch={dispatch}
        slidesLength={data.length}
        modalData={slidesCreateModalData}
      />
    </>
  );
};

export default SlidesContainer;
