import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IChildren } from '../../../interfaces/ITreeCategory';
import styles from './ChildrenCard.module.scss';
import { AiOutlineExclamation } from 'react-icons/ai';
import { VscAdd } from 'react-icons/vsc';
import { useHistory } from 'react-router';
import TreeCategoryModal from '../../../components/Modals/TreeCategoryModal/TreeCategoryModal';

interface ChildrenCategoriesDataProps {
  children: IChildren | undefined;
}

enum Type {
  INFO = 'info',
  EDIT = 'edit',
  ADD = 'add',
}

const ChildrenCard: FC<ChildrenCategoriesDataProps> = ({ children }) => {
  const [categoryModalIsOpen, setCategoryModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState();

  const history = useHistory();

  const categoryModalClose = () => {
    setCategoryModalOpen(false);
  };

  const openCategoryInfo = (id: number) => {
    setCategoryModalOpen(true);
    setModalParams({
      type: Type.INFO,
      categoryId: id,
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
              children.children?.length ? openCategoryInfo(children.id) : routeOnClick(children.id);
            }}
          >
            <span className={styles.title}>{children.name}</span>
          </div>
          <span className={styles.addIcon}>
            <VscAdd />
          </span>
        </div>
      ) : null}
      {categoryModalIsOpen && <TreeCategoryModal {...modalParams} />}
    </>
  );
};

export default ChildrenCard;
