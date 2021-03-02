import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { getCategoryByIdRequest } from '../../../store/actions/categories.actions';
import { RootState } from '../../../store/store';
import styles from './CategoryInfo.module.scss';
import AddBtn from '../../../components/AddBtn/AddBtn';
import CategoryGroupModal from '../../../components/Modals/CategoryGroupModal/CategoryGroupModal';

const CategoryInfo: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<Record<string, string | undefined>>();

  useEffect(() => {
    dispatch(getCategoryByIdRequest(Number(id)));
  }, [dispatch, id]);

  const { currentCategory: category, loading } = useSelector(
    (state: RootState) => state.categories
  );

  // ADD GROUP
  const [openNewGroupModal, setOpenNewGroupModal] = useState<boolean>(false);

  return (
    <>
      {loading && <LinearProgress />}

      {openNewGroupModal && (
        <CategoryGroupModal
          openNewGroupModal={openNewGroupModal}
          setOpenNewGroupModal={setOpenNewGroupModal}
        />
      )}

      {category ? (
        <div className={styles.container}>
          <h1>{category.name}</h1>
          <AddBtn
            title="Додати групу"
            handleAdd={() => {
              setOpenNewGroupModal(true);
            }}
          />
          <div className={styles['group-wrapper']}>Category Group</div>
        </div>
      ) : null}
    </>
  );
};

export default CategoryInfo;
