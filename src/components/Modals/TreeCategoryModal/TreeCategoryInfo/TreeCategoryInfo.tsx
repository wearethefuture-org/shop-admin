import React, { FC } from 'react';
import { ITreeCategory } from '../../../../interfaces/ITreeCategory';

import TreeCategoryBasicInfo from '../../../../pages/TreeCategories/TreeCategoryInfo/TreeCategoryBasicInfo/TreeCategoryBasicInfo';
import Button from '@material-ui/core/Button';
import styles from './TreeCategoryInfo.module.scss';

interface TreeCategoryInfoProps {
  category: ITreeCategory;
  closeModal: () => void;
}

const TreeCategoryInfo: FC<TreeCategoryInfoProps> = ({ category, closeModal }) => {
  return (
    <div className={styles.infoModal}>
      <TreeCategoryBasicInfo category={category} />
      <span className={styles.closeBtn}>
        <Button onClick={closeModal} variant="contained" color="primary">
          Закрити
        </Button>
      </span>
    </div>
  );
};

export default TreeCategoryInfo;
