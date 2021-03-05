import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';
import { Button, IconButton } from '@material-ui/core';

import { RootState } from '../../../../store/store';
import CharBlock from '../../CharBlock/CharBlock';
import { IChar, ICharToAdd, IGroup } from '../../../../interfaces/ICategory';
import CategoryCharModal from '../../../../components/Modals/CategoryCharModal/CategoryCharModal';
import styles from './CharGroup.module.scss';

interface IGroupProps {
  group: IGroup;
  expandedGroups: string[];
  setExpandedGroups: (g: string[]) => void;
  setGroupToEdit: (g: IGroup) => void;
  setOpenGroupModal: (b: boolean) => void;
  setEditGroup: (b: boolean) => void;
  handleDeleteGroup: (char: IGroup) => void;
  handleAddChar: (char: ICharToAdd, n: string) => void;
  handleEditChar: (char: IChar, group: IGroup) => void;
  handleDeleteChar: (char: IChar) => void;
}

const CharGroup: React.FC<IGroupProps> = ({
  group,
  expandedGroups,
  setExpandedGroups,
  setGroupToEdit,
  setOpenGroupModal,
  setEditGroup,
  handleDeleteGroup,
  handleAddChar,
  handleEditChar,
  handleDeleteChar,
}) => {
  const { darkMode } = useSelector((state: RootState) => state.theme);

  // EDIT GROUP
  const handleEdit = (group) => {
    setEditGroup(true);
    setOpenGroupModal(true);
    group && setGroupToEdit(group);
  };

  // EXPANDED GROUPS
  const handleExpandedChars = (name: string) =>
    name && expandedGroups.includes(name)
      ? setExpandedGroups(
          expandedGroups && expandedGroups.filter((groupName) => groupName && groupName !== name)
        )
      : expandedGroups && name && setExpandedGroups([...expandedGroups, name]);

  const [openCharModal, setOpenCharModal] = useState<boolean>(false);

  // EDIT CHAR
  const [charToEdit, setCharToEdit] = useState<IChar | null>(null);

  return (
    <>
      {group ? (
        <>
          {openCharModal && (
            <CategoryCharModal
              openCharModal={openCharModal}
              setOpenCharModal={setOpenCharModal}
              handleAddChar={handleAddChar}
              handleEditChar={handleEditChar}
              charToEdit={charToEdit}
              setCharToEdit={setCharToEdit}
              group={group}
            />
          )}

          <div className={darkMode ? styles['group-wrapper-dark'] : styles['group-wrapper']}>
            <div>
              <span
                className={
                  group && group.name && expandedGroups.includes(group.name)
                    ? styles['hide-btn']
                    : styles['expand-btn']
                }
                onClick={() => group.name && handleExpandedChars(group.name)}
              >
                <ArrowIcon />
              </span>
              <span className={styles['group-name']}>{group.name}</span>
            </div>
            <div className={styles['group-btn-wrapper']}>
              <div className={styles['hidden-btns']}>
                <IconButton
                  aria-label="edit"
                  color="default"
                  type="button"
                  onClick={() => handleEdit(group)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  type="button"
                  color="secondary"
                  onClick={() => group && handleDeleteGroup(group)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
              <Button
                variant="contained"
                className={styles['add-char-btn']}
                type="button"
                onClick={() => setOpenCharModal(true)}
              >
                Додати характеристику
              </Button>
            </div>
          </div>

          <div
            className={group.name && expandedGroups.includes(group.name) ? 'expanded' : 'shrinked'}
          >
            <CharBlock
              group={group}
              setCharToEdit={setCharToEdit}
              setOpenCharModal={setOpenCharModal}
              handleDeleteChar={handleDeleteChar}
            />
          </div>
        </>
      ) : null}
    </>
  );
};

export default CharGroup;
