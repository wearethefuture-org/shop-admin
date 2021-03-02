import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, IconButton, LinearProgress } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';

import {
  getCategoryByIdRequest,
  updateCategoryRequest,
} from '../../../store/actions/categories.actions';
import { AppDispatch, RootState } from '../../../store/store';
import AddBtn from '../../../components/AddBtn/AddBtn';
import CategoryGroupModal from '../../../components/Modals/CategoryGroupModal/CategoryGroupModal';
import { ICategoryResponse, IGroupResponse } from '../../../interfaces/ICategory';
import CategoryCharModal from '../../../components/Modals/CategoryCharModal/CategoryCharModal';
import { confirmDelete } from '../../../components/confirmAlert/confirmAlert';
import CharBlock from '../CharBlock/CharBlock';
import styles from './CategoryInfo.module.scss';

const CategoryInfo: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<Record<string, string | undefined>>();

  useEffect(() => {
    dispatch(getCategoryByIdRequest(Number(id)));
  }, [dispatch, id]);

  const category: ICategoryResponse = useSelector(
    (state: RootState) => state.categories.currentCategory
  );
  const { loading } = useSelector((state: RootState) => state.categories);
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const [charGroup, setCharGroup] = useState<IGroupResponse[]>([]);

  useEffect(() => {
    category && setCharGroup(category.characteristicGroup);
  }, [category]);

  // ADD GROUP
  const [openGroupModal, setOpenGroupModal] = useState<boolean>(false);

  // EDIT GROUP
  const [editGroupName, setEditGroupName] = useState<boolean>(false);
  const [groupNameEditId, setgroupNameEditId] = useState<number>(-1);

  const handleEditGroupName = (id: number | undefined) => {
    id && setgroupNameEditId(id);
    setEditGroupName(true);
    setOpenGroupModal(true);
  };

  // DELETE GROUP
  const handleDeleteGroup = (id: number | undefined, name: string | undefined) => {
    const char = charGroup.find((group) => group.id === id);

    const charIds = char && char?.characteristic?.map((char) => char.id);

    const handleConfirm = () => {
      id &&
        dispatch(
          charIds && charIds.length
            ? updateCategoryRequest({
                id: category.id,
                removedCharacteristics: {
                  characteristicGroupIDs: [id],
                  characteristicIDs: charIds,
                },
              })
            : updateCategoryRequest({
                id: category.id,
                removedCharacteristics: {
                  characteristicGroupIDs: [id],
                },
              })
        );
    };

    name &&
      confirmDelete(
        name,
        handleConfirm,
        "Значення цієї групи характеристик будуть видалені з усіх пов'язаних з нею продуктів"
      );
  };

  // ADD CHARACTERISTIC
  const [openCharModal, setOpenCharModal] = useState<boolean>(false);
  const [charGroupId, setCharGroupId] = useState<number>(-1);

  const handleChar = (id: number) => {
    setCharGroupId(id);
    setOpenCharModal(true);
  };

  // EXPANDED GROUPS
  const [expandedGroups, setExpandedGroups] = useState<(number | undefined)[]>([]);

  useEffect(() => {
    charGroup && charGroup.length
      ? setExpandedGroups(charGroup.map((group) => group.id))
      : setExpandedGroups([]);
  }, [charGroup]);

  const handleExpandedGroups = (id: number | undefined) =>
    id && expandedGroups.includes(id)
      ? setExpandedGroups(expandedGroups.filter((groupId) => groupId && groupId !== id))
      : setExpandedGroups([...expandedGroups, id]);

  return (
    <>
      {loading && <LinearProgress />}

      {openGroupModal && (
        <CategoryGroupModal
          openGroupModal={openGroupModal}
          setOpenGroupModal={setOpenGroupModal}
          category={category}
          editGroupName={editGroupName}
          setEditGroupName={setEditGroupName}
          groupNameEditId={groupNameEditId}
        />
      )}

      {openCharModal && (
        <CategoryCharModal
          openCharModal={openCharModal}
          setOpenCharModal={setOpenCharModal}
          editCharId={null}
          setEditCharId={null}
          charGroupId={charGroupId}
        />
      )}

      {category ? (
        <div className={styles.container}>
          <h1>{category.name}</h1>
          <div className={styles['add-btn-wrapper']}>
            <AddBtn
              title="Додати групу"
              handleAdd={() => {
                setOpenGroupModal(true);
              }}
            />
          </div>
          {charGroup?.length
            ? charGroup.map((group) => (
                <div key={group.id}>
                  <div
                    className={darkMode ? styles['group-wrapper-dark'] : styles['group-wrapper']}
                  >
                    <div>
                      <span
                        className={
                          expandedGroups.includes(group.id)
                            ? styles['hide-btn']
                            : styles['expand-btn']
                        }
                        onClick={() => handleExpandedGroups(group.id)}
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
                          onClick={() => handleEditGroupName(group.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          type="button"
                          color="secondary"
                          onClick={() => handleDeleteGroup(group.id, group.name)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                      <Button
                        variant="contained"
                        className={styles['add-char-btn']}
                        type="button"
                        onClick={() => handleChar(group.id)}
                      >
                        Додати характеристику
                      </Button>
                    </div>
                  </div>

                  {expandedGroups.includes(group.id) ? <CharBlock group={group} /> : null}
                </div>
              ))
            : null}
        </div>
      ) : null}
    </>
  );
};

export default CategoryInfo;
