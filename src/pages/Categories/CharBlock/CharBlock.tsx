import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import CategoryCharModal from '../../../components/Modals/CategoryCharModal/CategoryCharModal';
import { updateCategoryRequest } from '../../../store/actions/categories.actions';
import { AppDispatch, RootState } from '../../../store/store';
import { confirmDelete } from '../../../components/confirmAlert/confirmAlert';
import AsteriskIcon from '../../../assets/icons/AsteriskIcon';
import { IGroupResponse } from '../../../interfaces/ICategory';
import styles from './CharBlock.module.scss';
import { getIcon } from '../../../components/Modals/CategoryCharModal/categoryCharModalHelpers';

interface ICharBlock {
  group: IGroupResponse;
}

const CharBlock: React.FC<ICharBlock> = ({ group }) => {
  const dispatch: AppDispatch = useDispatch();

  const { currentCategory: category } = useSelector((state: RootState) => state.categories);
  const { darkMode } = useSelector((state: RootState) => state.theme);

  // DELETE CHAR
  const handleDeleteChar = (id: number, name: string) => {
    const handleDelete = () => {
      group &&
        dispatch(
          updateCategoryRequest({
            id: category.id,
            removedCharacteristics: {
              characteristicIDs: [id],
            },
          })
        );
    };

    const warning: string =
      "Значення цієї характеристики будуть видалені з усіх пов'язаних з нею продуктів";

    confirmDelete(name, handleDelete, warning);
  };

  // EDIT CHAR
  const [openCharModal, setOpenCharModal] = useState<boolean>(false);
  const [editCharId, setEditCharId] = useState<number>(-1);

  const handleEditChar = (id: number) => {
    setOpenCharModal(true);
    setEditCharId(id);
  };

  // HANDLE REQUIRED
  const handleRequired = (char) => {
    const updatedChar = {
      id: category.id,
      characteristicGroups: [
        {
          id: group.id,
          characteristics: [{ id: char.id, required: !char.required, categoryId: category.id }],
        },
      ],
    };

    dispatch(updateCategoryRequest(updatedChar));
  };

  return (
    <div>
      {openCharModal && (
        <CategoryCharModal
          openCharModal={openCharModal}
          setOpenCharModal={setOpenCharModal}
          editCharId={editCharId}
          setEditCharId={setEditCharId}
          charGroupId={group.id}
        />
      )}

      {group.characteristic?.length
        ? group.characteristic
            .sort((a, b) => a.id - b.id)
            .map((char) => (
              <div
                key={char.id}
                className={darkMode ? styles['char-wrapper-dark'] : styles['char-wrapper']}
              >
                <div className={styles['char-block']}>
                  <div className={styles['char-name-wrapper']}>
                    {char.type !== 'json' ? (
                      <div
                        className={
                          !char.required
                            ? styles['asterisk-icon']
                            : styles['asterisk-icon-required']
                        }
                        onClick={() => handleRequired(char)}
                      >
                        <AsteriskIcon />
                      </div>
                    ) : null}
                    <span className={styles['list-icon']}>{getIcon(char.type)}</span>
                    <span key={char.id}>{char.name}</span>
                  </div>

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
                    onClick={() => handleEditChar(char.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    type="button"
                    color="secondary"
                    onClick={() => handleDeleteChar(char?.id, char?.name)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))
        : null}
    </div>
  );
};

export default CharBlock;
