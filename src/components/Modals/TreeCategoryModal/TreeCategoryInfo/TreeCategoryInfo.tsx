import React, { FC } from 'react';
import { ITreeCategory } from '../../../../interfaces/ITreeCategory';

import TreeCategoryBasicInfo from '../../../../pages/TreeCategories/TreeCategoryInfo/TreeCategoryBasicInfo/TreeCategoryBasicInfo';
import Button from '@material-ui/core/Button';
import styles from './TreeCategoryInfo.module.scss';
import { COLORS } from '../../../../values/colors';
import { createStyles, makeStyles, ThemeOptions } from '@material-ui/core';

interface TreeCategoryInfoProps {
  category: ITreeCategory;
  closeModal: () => void;
}

const useStyles = makeStyles(
  (): ThemeOptions =>
    createStyles({
      closeButton: {
        'borderRadius': '30px',
        'color': COLORS.primaryLight,
        'backgroundColor': COLORS.primaryGray,
        'marginTop': '15px',
        '&:hover': {
          backgroundColor: COLORS.secondaryGray,
        },
      },
    })
);

const TreeCategoryInfo: FC<TreeCategoryInfoProps> = ({ category, closeModal }) => {
  const classes = useStyles();

  return (
    <div className={styles.infoModal}>
      <TreeCategoryBasicInfo category={category} />
      <span className={styles.closeBtn}>
        <Button
          className={classes.closeButton}
          onClick={closeModal}
          variant="contained"
          color="primary"
        >
          Закрити
        </Button>
      </span>
    </div>
  );
};

export default TreeCategoryInfo;
