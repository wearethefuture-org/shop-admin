import React, { FC, useState } from 'react';
import { api } from '../../../api/api';
import { failSnackBar } from '../../../store/actions/snackbar.actions';
import { Dispatch } from 'redux';
import { useHistory } from 'react-router';
import { IChildren, ITreeCategory } from '../../../interfaces/ITreeCategory';

import TreeItem from '@material-ui/lab/TreeItem';
import styles from './ChildrenCard.module.scss';
import AddIcon from '@material-ui/icons/Add';

import TreeCategoryModal from '../../../components/Modals/TreeCategoryModal/TreeCategoryModal';
import AddTreeCategoryModal from '../../../components/Modals/TreeCategoryModal/AddTreeCategoryModal/AddTreeCategoryModal';
import { Switch } from '@material-ui/core';
interface ISearchProps {
  targetId: number;
  mpath: string[];
}

interface ChildrenCategoriesDataProps {
  renderTree: (nodes: any) => JSX.Element;
  dispatch: Dispatch;
  nodes: IChildren;
  toggleOpen: (id: string) => void;
  darkMode: boolean;
  searchProps?: ISearchProps;
}

export interface ModalsState {
  categoryModalIsOpen: boolean;
  addCategoryModalIsOpen: boolean;
}

const ChildrenCard: FC<ChildrenCategoriesDataProps> = ({
  renderTree,
  dispatch,
  nodes,
  toggleOpen,
  darkMode,
  searchProps,
}) => {
  const [modalsState, setModalsState] = useState<ModalsState>({
    categoryModalIsOpen: false,
    addCategoryModalIsOpen: false,
  });
  const [modalParams, setModalParams] = useState();
  const [addModalParams, setAddModalParams] = useState();

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
    const parentInfo = {
      id: parent.id,
      name: parent.name,
    };
    if (!parent?.children?.length) {
      const { data: category } = await api.treeCategories.getById(parent.id);

      if (category?.characteristicGroup?.length) {
        dispatch(
          failSnackBar('Неможливо створити підкатегорію. Дана категорія містить характеристики!')
        );
        return;
      }
    }
    setAddModalParams({
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
    history.push({
      pathname: `/tree-category/${id}`,
      state: {
        searchProps,
      },
    });
  };

  return (
    <>
      {nodes ? (
        <div className={styles.childrenCard}>
          <div
            id={String(nodes.id)}
            className={darkMode ? styles['childrenBody-dark'] : styles['childrenBody']}
          >
            <TreeItem
              onIconClick={() => toggleOpen(String(nodes.id))}
              onLabelClick={(event) => {
                event.preventDefault();
              }}
              key={nodes.id}
              nodeId={String(nodes.id)}
              label={
                <div className={styles.row}>
                  <span
                    onClick={() => {
                      nodes.children?.length ? openCategoryInfo(nodes) : routeOnClick(nodes.id);
                    }}
                  >
                    {nodes.name}
                  </span>{' '}
                  <span onClick={() => showAddCategoryModal(nodes)} className={styles.addIcon}>
                    <AddIcon />
                  </span>
                  <span>
                    <Switch />
                  </span>
                </div>
              }
            >
              {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
            </TreeItem>
          </div>
        </div>
      ) : null}
      {modalsState.categoryModalIsOpen && <TreeCategoryModal {...modalParams} />}
      {modalsState.addCategoryModalIsOpen && (
        <AddTreeCategoryModal {...addModalParams} dispatch={dispatch} />
      )}
    </>
  );
};

export default ChildrenCard;
