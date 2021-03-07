import React, { Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';
import { Button, IconButton } from '@material-ui/core';

import { RootState } from '../../../../store/store';
import CharBlock from './CharBlock/CharBlock';
import CategoryCharModal from '../../../../components/Modals/CategoryCharModal/CategoryCharModal';
import { CategoryToDispalayAction, GroupToDisplay } from '../categoryToDisplayReducer';
import { CategoryAction, Char } from '../categoryReducer';
import { confirmDelete } from '../../../../components/confirmAlert/confirmAlert';
import styles from './CharGroup.module.scss';

interface IGroupProps {
  group: GroupToDisplay;
  expandedGroups: string[];
  setExpandedGroups: Dispatch<SetStateAction<string[]>>;
  setOpenGroupModal: Dispatch<SetStateAction<boolean>>;
  setGroupToEdit: Dispatch<SetStateAction<GroupToDisplay | null>>;
  categoryDispatch: Dispatch<CategoryAction>;
  categoryDisplayDispatch: Dispatch<CategoryToDispalayAction>;
}

const CharGroup: React.FC<IGroupProps> = ({
  group,
  expandedGroups,
  setExpandedGroups,
  setOpenGroupModal,
  setGroupToEdit,
  categoryDispatch,
  categoryDisplayDispatch,
}) => {
  const { darkMode } = useSelector((state: RootState) => state.theme);

  // EDIT GROUP
  const handleEditGroup = (group) => {
    setOpenGroupModal(true);
    group && setGroupToEdit(group);
  };

  // DELETE GROUP
  const handleDeleteGroup = (group) => {
    const handleDelete = () => {
      categoryDispatch({
        type: 'deleteGroup',
        prevGroup: group,
      });
      categoryDisplayDispatch({
        type: 'deleteDisplayGroup',
        groupName: group.name,
      });
    };

    confirmDelete(
      group.name,
      handleDelete,
      'Група буде повністю видалена, включаючи пов`язані з нею характеристики та їх значення'
    );
  };

  // EXPANDED GROUPS
  const handleExpandedChars = (name: string) =>
    name && expandedGroups.includes(name)
      ? setExpandedGroups(
          expandedGroups && expandedGroups.filter((groupName) => groupName && groupName !== name)
        )
      : expandedGroups && name && setExpandedGroups([...expandedGroups, name]);

  // OPEN MODAL
  const [openCharModal, setOpenCharModal] = useState<boolean>(false);

  // EDIT CHAR
  const [charToEdit, setCharToEdit] = useState<Char | null>(null);

  // DELETE CHAR
  const handleDeleteChar = (char) => {
    const handleDelete = () => {
      if (group.name) {
        categoryDispatch({
          type: 'deleteChar',
          groupName: group.name,
          charName: char.name,
          charId: char.id,
        });
        categoryDisplayDispatch({
          type: 'deleteDisplayChar',
          groupName: group.name,
          charName: char.name,
        });
      }
    };

    group.name &&
      confirmDelete(
        group.name,
        handleDelete,
        'Характеристика та її значення будуть повністю видалені з усіх пов`язаних з нею продуктів'
      );
  };

  return (
    <>
      {group ? (
        <>
          {openCharModal && (
            <CategoryCharModal
              openCharModal={openCharModal}
              setOpenCharModal={setOpenCharModal}
              charToEdit={charToEdit}
              setCharToEdit={setCharToEdit}
              group={group}
              categoryDispatch={categoryDispatch}
              categoryDisplayDispatch={categoryDisplayDispatch}
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
                  onClick={() => handleEditGroup(group)}
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
              setOpenCharModal={setOpenCharModal}
              setCharToEdit={setCharToEdit}
              handleDeleteChar={handleDeleteChar}
            />
          </div>
        </>
      ) : null}
    </>
  );
};

export default CharGroup;
