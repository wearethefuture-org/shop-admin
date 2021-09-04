import React, { FC, useState } from 'react';
import { api } from '../../../api/api';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { IChildren, ITreeCategory } from '../../../interfaces/ITreeCategory';
import styles from './ChildrenCard.module.scss';
import { AiOutlineExclamation } from 'react-icons/ai';
import { VscAdd } from 'react-icons/vsc';
import { useHistory } from 'react-router';
import TreeCategoryModal from '../../../components/Modals/TreeCategoryModal/TreeCategoryModal';
import AddTreeCategoryModal from '../../../components/Modals/TreeCategoryModal/AddTreeCategoryModal/AddTreeCategoryModal';

interface ChildrenCategoriesDataProps {
  dispatch: Dispatch;
  children: IChildren | undefined;
}

const ChildrenCard: FC<ChildrenCategoriesDataProps> = ({ dispatch, children }) => {
  const [addCategoryModalIsOpen, setAddCategoryModalOpen] = useState(false);
  const [categoryModalIsOpen, setCategoryModalOpen] = useState(false);
  const [hasChar, setHasChar] = useState<boolean>(false);
  const [modalParams, setModalParams] = useState();

  const checkCategoryChar = async (id: number) => {
    const { data: category } = await api.treeCategories.getById(id);

    if (category && category?.characteristicGroup?.length) {
      setHasChar(true);
    }
  };

  if (children && !children?.children?.length) {
    checkCategoryChar(children.id);
  }

  const history = useHistory();

  const addCategoryModalClose = () => {
    setAddCategoryModalOpen(false);
  };

  const categoryModalClose = () => {
    setCategoryModalOpen(false);
  };

  const showAddCategoryModal = (parent: ITreeCategory) => {
    const parentInfo = {
      id: parent.id,
      name: parent.name,
    };
    setAddCategoryModalOpen(true);
    setModalParams({
      parentInfo,
      closeModal: addCategoryModalClose,
    });
  };

  const openCategoryInfo = (category: ITreeCategory) => {
    setCategoryModalOpen(true);
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
          {!hasChar && (
            <span onClick={() => showAddCategoryModal(children)} className={styles.addIcon}>
              <VscAdd />
            </span>
          )}
        </div>
      ) : null}
      {categoryModalIsOpen && <TreeCategoryModal {...modalParams} />}
      {addCategoryModalIsOpen && <AddTreeCategoryModal {...modalParams} dispatch={dispatch} />}
    </>
  );
};

export default ChildrenCard;
