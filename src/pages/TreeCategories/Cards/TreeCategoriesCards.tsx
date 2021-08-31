import React, { FC, useState, ReactNode } from 'react';
import { useHistory } from 'react-router';
import { Dispatch } from 'redux';

import { ITreeCategory, IGetTreeCategoriesResponse } from '../../../interfaces/ITreeCategory';
import styles from './TreeCategoriesCards.module.scss';
import { Collapse } from 'reactstrap';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import CategoryInfoModal from '../../../components/Modals/CategoryInfoModal/CategoryInfoModal';
import ChildrenCard from '../ChildrenCard/ChildrenCard';
import { ImTree } from 'react-icons/im';
import Tree, { withStyles } from 'react-vertical-tree';
import MainTreeCategoryModal from '../../../components/Modals/TreeCategoryModal/MainTreeCategoryModal/MainTreeCategoryModal';
import DeleteTreeCategoryModal from '../../../components/Modals/TreeCategoryModal/DeleteTreeCategoryModal/DeleteTreeCategoryModal';

interface TreeCategoriesDataProps {
  dispatch: Dispatch;
  list: IGetTreeCategoriesResponse[];
}

interface ExpandableBlockProps {
  blockName: string;
  toggleOpen: (section: string) => void;
  openSections: string[];
  title: string;
  children: ReactNode;
}

const ExpandableBlock: FC<ExpandableBlockProps> = ({
  blockName,
  toggleOpen,
  openSections,
  title,
  children,
}) => {
  return (
    <div>
      <div onClick={() => toggleOpen(blockName)}>
        <span className={styles.expandBlockArrow}>
          {openSections.includes(blockName) ? (
            <IoIosArrowUp size={23} style={{ color: 'green' }} />
          ) : (
            <IoIosArrowDown size={23} />
          )}
        </span>
        <h5>{title}</h5>
      </div>
      <Collapse isOpen={openSections.includes(blockName)}>
        <div className={styles.childrensTitle}>
          <span className={styles.forkIcon}>
            <ImTree />
          </span>
          <span className={styles.title}>Дерево підкатегорій</span>
        </div>

        <div className={styles.children}>{children}</div>
      </Collapse>
    </div>
  );
};

const TreeCategoriesCards: FC<TreeCategoriesDataProps> = ({ dispatch, list }) => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [categoryModalIsOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<number | null>(null);
  const [modalParams, setModalParams] = useState();

  const history = useHistory();

  const customStyles = {
    lines: {
      color: 'green',
      height: '60px',
      zIndex: '5',
    },
  };

  const StyledTree = withStyles(customStyles)(Tree);

  const toggleOpen = (section: string) => {
    openSections.includes(section)
      ? setOpenSections(openSections.filter((sec) => sec !== section))
      : setOpenSections(openSections.concat(section));
  };

  const categoryModalClose = () => {
    setCategoryModalOpen(false);
  };

  const closeDeleteModal = () => {
    setOpenDeleteDialog(null);
  };

  const openCategoryInfo = (category: ITreeCategory) => {
    setCategoryModalOpen(true);
    setModalParams({
      category,
      closeModal: categoryModalClose,
    });
  };

  return (
    <>
      <div className={styles.cardsContainer}>
        {list.map((l) => (
          <div className={styles.card}>
            {openDeleteDialog === l.id && (
              <DeleteTreeCategoryModal
                handleClose={closeDeleteModal}
                categoryInfo={{ id: l.id, name: l.name }}
              />
            )}
            <ExpandableBlock
              blockName={l.key}
              toggleOpen={toggleOpen}
              openSections={openSections}
              title={l.name}
            >
              <div className={styles.childrensBlock}>
                <StyledTree
                  data={l.children}
                  direction
                  render={(item) => <ChildrenCard dispatch={dispatch} children={item} />}
                />
              </div>
            </ExpandableBlock>
            <hr />
            <div className={styles.icons}>
              <InfoIcon onClick={() => openCategoryInfo(l)} />
              <EditIcon />
              <DeleteIcon onClick={() => setOpenDeleteDialog(l.id)} />
            </div>
          </div>
        ))}
      </div>
      {categoryModalIsOpen && <MainTreeCategoryModal {...modalParams} />}
    </>
  );
};

export default TreeCategoriesCards;
