import React, { FC, useState } from 'react';
import { Dispatch } from 'redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { setExpandedTrees, getExpandedTrees } from '../../../services/local-storage-controller';
import { ITreeCategory, IGetTreeCategoriesResponse } from '../../../interfaces/ITreeCategory';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeView from '@material-ui/lab/TreeView';
import styles from './TreeCategoriesCards.module.scss';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';

import ExpandableBlock from './ExpandableBlock/ExpandableBlock';
import ChildrenCard from '../ChildrenCard/ChildrenCard';
import MainTreeCategoryModal from '../../../components/Modals/TreeCategoryModal/MainTreeCategoryModal/MainTreeCategoryModal';
import DeleteTreeCategoryModal from '../../../components/Modals/TreeCategoryModal/DeleteTreeCategoryModal/DeleteTreeCategoryModal';

interface TreeCategoriesDataProps {
  dispatch: Dispatch;
  list: IGetTreeCategoriesResponse[];
}

export interface ModalsState {
  categoryModalIsOpen: boolean;
  deleteModal: number | null;
}

enum Type {
  INFO = 'info',
  EDIT = 'edit',
}

const TreeCategoriesCards: FC<TreeCategoriesDataProps> = ({ dispatch, list }) => {
  const [openSections, setOpenSections] = useState<string[]>(getExpandedTrees);
  const [modalParams, setModalParams] = useState();
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const [modalsState, setModalsState] = useState<ModalsState>({
    categoryModalIsOpen: false,
    deleteModal: null,
  });

  const toggleOpen = (section: string) => {
    setExpandedTrees(section);
    setOpenSections(getExpandedTrees);
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

  const renderTree = (nodes) => (
    <ChildrenCard
      key={nodes.id}
      renderTree={renderTree}
      dispatch={dispatch}
      nodes={nodes}
      toggleOpen={toggleOpen}
      darkMode={darkMode}
    />
  );

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
              toggleOpen={() => toggleOpen(String(l.id))}
              openSections={openSections}
              title={l.name}
              id={String(l.id)}
              hasTree={l.children?.length ? true : false}
            >
              <div>
                <TreeView
                  expanded={openSections}
                  className={styles.childrensBlock}
                  disableSelection={true}
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                >
                  {renderTree(l)}
                </TreeView>
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
    </>
  );
};

export default TreeCategoriesCards;
