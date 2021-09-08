import React, { FC, useState, ReactNode } from 'react';
import { useHistory } from 'react-router';
import { Dispatch } from 'redux';
import { setExpandedTrees, getExpandedTrees } from '../../../services/local-storage-controller';

import { ITreeCategory, IGetTreeCategoriesResponse } from '../../../interfaces/ITreeCategory';
import styles from './TreeCategoriesCards.module.scss';
import { VscAdd } from 'react-icons/vsc';
import Accordion from '@material-ui/core/Accordion';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import ChildrenCard from '../ChildrenCard/ChildrenCard';
import { ImTree } from 'react-icons/im';
import Tree, { withStyles } from 'react-vertical-tree';
import MainTreeCategoryModal from '../../../components/Modals/TreeCategoryModal/MainTreeCategoryModal/MainTreeCategoryModal';
import DeleteTreeCategoryModal from '../../../components/Modals/TreeCategoryModal/DeleteTreeCategoryModal/DeleteTreeCategoryModal';
import AddTreeCategoryModal from '../../../components/Modals/TreeCategoryModal/AddTreeCategoryModal/AddTreeCategoryModal';

interface TreeCategoriesDataProps {
  dispatch: Dispatch;
  list: IGetTreeCategoriesResponse[];
}

interface ExpandableBlockProps {
  toggleOpen: (section: number) => void;
  openSections: number[];
  title: string;
  id: number;
  hasTree: boolean;
  showAddCategoryModal: (id: number, name: string) => void;
  children: ReactNode;
}

enum Type {
  INFO = 'info',
  EDIT = 'edit',
}

const ExpandableBlock: FC<ExpandableBlockProps> = ({
  toggleOpen,
  openSections,
  title,
  id,
  hasTree,
  showAddCategoryModal,
  children,
}) => {
  return (
    <div>
      <Accordion className={styles.expandBlock} expanded={openSections.includes(id)}>
        <div onClick={() => toggleOpen(id)}>
          <span className={styles.expandBlockArrow}>
            {openSections.includes(id) ? (
              <IoIosArrowUp size={23} style={{ color: 'green' }} />
            ) : (
              <IoIosArrowDown size={23} />
            )}
          </span>
          <h5>{title}</h5>
        </div>
        <div className={styles.treeHeader}>
          {hasTree ? (
            <div>
              <span className={styles.title}>
                <span className={styles.forkIcon}>
                  <ImTree />
                </span>
                <span>Дерево категорій</span>
              </span>
            </div>
          ) : (
            <span className={styles.emptyTitle}>Дерево категорій пусте</span>
          )}
          <div>
            <Button
              variant="contained"
              className={styles.addSubBtn}
              onClick={() => showAddCategoryModal(id, title)}
            >
              <VscAdd />
              Створити підкатегорію
            </Button>
          </div>
        </div>
        <div className={styles.children}>{children}</div>
      </Accordion>
    </div>
  );
};

const TreeCategoriesCards: FC<TreeCategoriesDataProps> = ({ dispatch, list }) => {
  const [openSections, setOpenSections] = useState<number[]>(getExpandedTrees);
  const [categoryModalIsOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<number | null>(null);
  const [addCategoryModalIsOpen, setAddCategoryModalOpen] = useState<boolean>(false);
  const [modalParams, setModalParams] = useState();
  const [addModalParams, setAddModalParams] = useState();
  const [editMode, setEditMode] = useState<boolean>(false);

  const history = useHistory();

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
    setAddCategoryModalOpen(false);
  };

  const showAddCategoryModal = (id: number, name: string) => {
    const parentInfo = {
      id,
      name,
    };
    setAddCategoryModalOpen(true);
    setAddModalParams({
      parentInfo,
      closeModal: addCategoryModalClose,
    });
  };

  const categoryModalClose = () => {
    setCategoryModalOpen(false);
  };

  const closeDeleteModal = () => {
    setOpenDeleteDialog(null);
  };

  const openCategoryModal = (category: ITreeCategory, type: string) => {
    setCategoryModalOpen(true);
    setModalParams({
      type,
      category,
      closeModal: categoryModalClose,
    });
  };

  return (
    <>
      <div className={styles.cardsContainer}>
        {list.map((l) => (
          <div className={styles.card} key={l.id}>
            {openDeleteDialog === l.id && (
              <DeleteTreeCategoryModal
                handleClose={closeDeleteModal}
                categoryInfo={{ id: l.id, name: l.name }}
              />
            )}
            <ExpandableBlock
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
              <DeleteIcon onClick={() => setOpenDeleteDialog(l.id)} />
            </div>
          </div>
        ))}
      </div>
      {categoryModalIsOpen && <MainTreeCategoryModal {...modalParams} />}
      {addCategoryModalIsOpen && <AddTreeCategoryModal {...addModalParams} dispatch={dispatch} />}
    </>
  );
};

export default TreeCategoriesCards;
