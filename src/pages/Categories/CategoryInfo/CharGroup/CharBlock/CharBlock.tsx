import React, { Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { RootState } from '../../../../../store/store';
import AsteriskIcon from '../../../../../assets/icons/AsteriskIcon';
import { getIcon } from '../../../../../components/Modals/CategoryCharModal/categoryCharModalHelpers';
import { CategoryAction, CategoryActionTypes, Char } from '../../categoryReducer';
import {
  CategoryToDispalayAction,
  CategoryToDisplayActionTypes,
  GroupToDisplay,
} from '../../categoryToDisplayReducer';
import CustomConfirm from '../../../../../components/CustomConfirm/CustomConfirm';
import styles from './CharBlock.module.scss';

interface ICharBlock {
  group: GroupToDisplay;
  setOpenCharModal: Dispatch<SetStateAction<boolean>>;
  setCharToEdit: Dispatch<SetStateAction<Char | null>>;
  categoryDispatch: Dispatch<CategoryAction>;
  categoryDisplayDispatch: Dispatch<CategoryToDispalayAction>;
}

const CharBlock: React.FC<ICharBlock> = ({
  group,
  setOpenCharModal,
  setCharToEdit,
  categoryDispatch,
  categoryDisplayDispatch,
}) => {
  const { darkMode } = useSelector((state: RootState) => state.theme);

  // EDIT CHAR
  const handleEditChar = (char: Char) => {
    setOpenCharModal(true);
    char && setCharToEdit(char);
  };

  // DELETE CHAR
  const [openDeleteCharDialog, setOpenDeleteCharDialog] = useState<boolean>(false);
  const [charToDelete, setCharToDelete] = useState<Char | undefined>(undefined);

  const openDeleteDialog = (char) => {
    setCharToDelete(char);
    setOpenDeleteCharDialog(true);
  };

  const handleDeleteChar = () => {
    if (group.name && charToDelete) {
      categoryDispatch({
        type: CategoryActionTypes.deleteChar,
        group: group,
        char: charToDelete && charToDelete,
      });
      categoryDisplayDispatch({
        type: CategoryToDisplayActionTypes.deleteChar,
        groupName: group.name,
        charName: charToDelete.name ? charToDelete.name : '',
      });
    }

    setOpenDeleteCharDialog(false);
    setCharToDelete(undefined);
  };

  return (
    <>
      {group ? (
        <>
          {group && group.characteristic && group.characteristic.length
            ? group.characteristic.map((char) => (
                <div
                  key={char.name}
                  className={darkMode ? styles['char-wrapper-dark'] : styles['char-wrapper']}
                >
                  {openDeleteCharDialog && charToDelete && (
                    <CustomConfirm
                      openDeleteDialog={openDeleteCharDialog}
                      closeDeleteDialog={() => setOpenDeleteCharDialog(false)}
                      name={charToDelete && charToDelete.name ? charToDelete.name : ''}
                      warning="Характеристика та її значення будуть повністю видалені з усіх пов`язаних з нею продуктів"
                      handleDelete={handleDeleteChar}
                    />
                  )}

                  <div className={styles['char-block']}>
                    <div className={styles['char-name-wrapper']}>
                      {char.type !== 'json' ? (
                        char.required ? (
                          <div className={styles['asterisk-icon-required']}>
                            <AsteriskIcon />
                          </div>
                        ) : (
                          <div className={styles['asterisk-icon']}>
                            <AsteriskIcon />
                          </div>
                        )
                      ) : null}

                      <span className={styles['list-icon']}>{getIcon(char.type)}</span>
                      <span key={char.id}>{char.name}</span>
                    </div>

                    {char.type === 'string' || char.type === 'number'
                      ? char.defaultValues && (
                          <span className={styles['default-values']}>
                            {char.defaultValues.values[0]}
                          </span>
                        )
                      : null}

                    {char.type === 'enum' ? (
                      <ul className={styles['enum-values']}>
                        {char.defaultValues &&
                          char.defaultValues.values.map((value) => <li key={value}>{value}</li>)}
                      </ul>
                    ) : null}

                    {char.type === 'range' ? (
                      <div className={styles['range-values']}>
                        <p>
                          Від: <span>{char.minValue}</span>
                        </p>
                        <p>
                          До: <span>{char.maxValue}</span>
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <div className={styles['hidden-btns']}>
                    <IconButton
                      aria-label="edit"
                      color="default"
                      type="button"
                      onClick={() => handleEditChar(char)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      type="button"
                      color="secondary"
                      onClick={() => openDeleteDialog(char)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              ))
            : null}
        </>
      ) : null}
    </>
  );
};

export default CharBlock;
