import React, { FC, useState } from 'react';
import { api } from '../../../api/api';
import { failSnackBar } from '../../../store/actions/snackbar.actions';
import { Dispatch } from 'redux';
import { useHistory } from 'react-router';
import { IChildren, ITreeCategory } from '../../../interfaces/ITreeCategory';

import styles from './ChildrenCard.module.scss';
import { VscAdd } from 'react-icons/vsc';
import TreeCategoryModal from '../../../components/Modals/TreeCategoryModal/TreeCategoryModal';
import AddTreeCategoryModal from '../../../components/Modals/TreeCategoryModal/AddTreeCategoryModal/AddTreeCategoryModal';

interface ChildrenCategoriesDataProps {
  dispatch: Dispatch;
  children: IChildren;
}

export interface ModalsState {
  categoryModalIsOpen: boolean;
  addCategoryModalIsOpen: boolean;
}

const ChildrenCard: FC<ChildrenCategoriesDataProps> = ({ dispatch, children }) => {
  const [modalsState, setModalsState] = useState<ModalsState>({
    categoryModalIsOpen: false,
    addCategoryModalIsOpen: false,
  });
  const [modalParams, setModalParams] = useState();

  const history = useHistory();

  const addCategoryModalClose = () => {
    setModalsState((prevState) => ({
      ...prevState,
      addCategoryModalIsOpen: false,
    }));
  };

  const categoryModalClose = () => {
    setModalsState((prevState) => ({
      ...prevState,
      categoryModalIsOpen: false,
    }));
  };

  const showAddCategoryModal = async (parent: ITreeCategory) => {
    if (!parent?.children?.length) {
      const { data: category } = await api.treeCategories.getById(parent.id);

      if (category?.characteristicGroup?.length) {
        dispatch(
          failSnackBar('Неможливо створити підкатегорію. Дана категорія містить характеристики!')
        );
        return;
      }
    }

    const parentInfo = {
      id: parent.id,
      name: parent.name,
    };

    setModalParams({
      parentInfo,
      closeModal: addCategoryModalClose,
    });
    setModalsState((prevState) => ({
      ...prevState,
      addCategoryModalIsOpen: true,
    }));
  };

  const openCategoryInfo = (category: ITreeCategory) => {
    setModalsState((prevState) => ({
      ...prevState,
      categoryModalIsOpen: true,
    }));
    setModalParams({
      category,
      closeModal: categoryModalClose,
    });
  };

  const routeOnClick = (id: number) => {
    history.push(`/tree-category/${id}`);
  };

  return (
    <>
      {children ? (
        <div className={styles.childrenCard}>
          <div
            className={styles.childrenBody}
            onClick={() => {
              children.children?.length ? openCategoryInfo(children) : routeOnClick(children.id);
            }}
          >
            <span className={styles.title}>{children.name}</span>
          </div>
          <span onClick={() => showAddCategoryModal(children)} className={styles.addIcon}>
            <VscAdd />
          </span>
        </div>
      ) : null}
      {modalsState.categoryModalIsOpen && <TreeCategoryModal {...modalParams} />}
      {modalsState.addCategoryModalIsOpen && (
        <AddTreeCategoryModal {...modalParams} dispatch={dispatch} />
      )}
    </>
  );
};

export default ChildrenCard;
