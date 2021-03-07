import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { RootState } from '../../../../../store/store';
import AsteriskIcon from '../../../../../assets/icons/AsteriskIcon';
import { getIcon } from '../../../../../components/Modals/CategoryCharModal/categoryCharModalHelpers';
import { Char } from '../../categoryReducer';
import { GroupToDisplay } from '../../categoryToDisplayReducer';
import styles from './CharBlock.module.scss';

interface ICharBlock {
  group: GroupToDisplay;
  setOpenCharModal: Dispatch<SetStateAction<boolean>>;
  setCharToEdit: Dispatch<SetStateAction<Char | null>>;
  handleDeleteChar: (c: Char) => void;
}

const CharBlock: React.FC<ICharBlock> = ({
  group,
  setOpenCharModal,
  setCharToEdit,
  handleDeleteChar,
}) => {
  const { darkMode } = useSelector((state: RootState) => state.theme);

  // EDIT CHAR
  const handleEditChar = (char: Char) => {
    setOpenCharModal(true);
    char && setCharToEdit(char);
  };

  return (
    <div>
      {group ? (
        <>
          {group && group.characteristic && group.characteristic.length
            ? group.characteristic.map((char) => (
                <div
                  key={char.name}
                  className={darkMode ? styles['char-wrapper-dark'] : styles['char-wrapper']}
                >
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
                      onClick={() => handleDeleteChar(char)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              ))
            : null}
        </>
      ) : null}
    </div>
  );
};

export default CharBlock;
