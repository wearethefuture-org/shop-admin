import React, { FC, useState } from 'react';
import { Dispatch } from 'redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setExpandedTrees, getExpandedTrees } from '../../../services/local-storage-controller';
import { ITreeCategory, IGetTreeCategoriesResponse } from '../../../interfaces/ITreeCategory';

import styles from './TreeCategoriesCards.module.scss';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';

import Tree, { withStyles } from 'react-vertical-tree';
import ExpandableBlock from './ExpandableBlock/ExpandableBlock';
import ChildrenCard from '../ChildrenCard/ChildrenCard';
import MainTreeCategoryModal from '../../../components/Modals/TreeCategoryModal/MainTreeCategoryModal/MainTreeCategoryModal';
import DeleteTreeCategoryModal from '../../../components/Modals/TreeCategoryModal/DeleteTreeCategoryModal/DeleteTreeCategoryModal';
import AddTreeCategoryModal from '../../../components/Modals/TreeCategoryModal/AddTreeCategoryModal/AddTreeCategoryModal';

interface TreeCategoriesDataProps {
  dispatch: Dispatch;
  list: IGetTreeCategoriesResponse[];
}

export interface ModalsState {
  categoryModalIsOpen: boolean;
  deleteModal: number | null;
  addCategoryModalIsOpen: boolean;
}

enum Type {
  INFO = 'info',
  EDIT = 'edit',
}

const TreeCategoriesCards: FC<TreeCategoriesDataProps> = ({ dispatch, list }) => {
  const [openSections, setOpenSections] = useState<number[]>(getExpandedTrees);
  const [modalsState, setModalsState] = useState<ModalsState>({
    categoryModalIsOpen: false,
    deleteModal: null,
    addCategoryModalIsOpen: false,
  });
  const [modalParams, setModalParams] = useState();
  const [addModalParams, setAddModalParams] = useState();
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const customStyles = {
    lines: {
      color: 'green',
      height: '60px',
      zIndex: '5',
    },
  };

  const StyledTree = withStyles(customStyles)(Tree);

  const toggleOpen = (section: number) => {
    setExpandedTrees(section);
    setOpenSections(getExpandedTrees);
  };

  const addCategoryModalClose = () => {
    setModalsState((prevState) => ({
      ...prevState,
      addCategoryModalIsOpen: false,
    }));
  };

  const showAddCategoryModal = (id: number, name: string) => {
    const parentInfo = {
      id,
      name,
    };
    setModalsState((prevState) => ({
      ...prevState,
      addCategoryModalIsOpen: true,
    }));

    setAddModalParams({
      parentInfo,
      closeModal: addCategoryModalClose,
    });
  };

  const categoryModalClose = () => {
    setModalsState((prevState) => ({
      ...prevState,
      categoryModalIsOpen: false,
    }));
  };

  const closeDeleteModal = () => {
    setModalsState((prevState) => ({
      ...prevState,
      deleteModal: null,
    }));
  };

  const openCategoryModal = (category: ITreeCategory, type: string) => {
    setModalsState((prevState) => ({
      ...prevState,
      categoryModalIsOpen: true,
    }));
    setModalParams({
      type,
      category,
      closeModal: categoryModalClose,
    });
  };

  return (
    <>
      <div className={darkMode ? styles['cardsContainer-dark'] : styles['cardsContainer']}>
        {list.map((l) => (
          <div className={styles.card} key={l.id}>
            {modalsState.deleteModal === l.id && (
              <DeleteTreeCategoryModal
                handleClose={closeDeleteModal}
                categoryInfo={{ id: l.id, name: l.name }}
              />
            )}
            <ExpandableBlock
              darkMode={darkMode}
              toggleOpen={toggleOpen}
              openSections={openSections}
              title={l.name}
              id={l.id}
              hasTree={l.children?.length ? true : false}
              showAddCategoryModal={showAddCategoryModal}
            >
              <div className={styles.childrensBlock}>
                <StyledTree
                  data={l.children}
                  direction
                  render={(item) => (
                    <ChildrenCard key={item.id} dispatch={dispatch} children={item} />
                  )}
                />
              </div>
            </ExpandableBlock>
            <hr />
            <div className={styles.icons}>
              <InfoIcon onClick={() => openCategoryModal(l, Type.INFO)} />
              <EditIcon onClick={() => openCategoryModal(l, Type.EDIT)} />
              <DeleteIcon
                onClick={() =>
                  setModalsState((prevState) => ({
                    ...prevState,
                    deleteModal: l.id,
                  }))
                }
              />
            </div>
          </div>
        ))}
      </div>
      {modalsState.categoryModalIsOpen && <MainTreeCategoryModal {...modalParams} />}
      {modalsState.addCategoryModalIsOpen && (
        <AddTreeCategoryModal {...addModalParams} dispatch={dispatch} />
      )}
    </>
  );
};

export default TreeCategoriesCards;
