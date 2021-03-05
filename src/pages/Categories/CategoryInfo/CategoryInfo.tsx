import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, IconButton, LinearProgress } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { updateCategoryRequest } from '../../../store/actions/categories.actions';
import { AppDispatch, RootState } from '../../../store/store';
import AddBtn from '../../../components/AddBtn/AddBtn';
import CategoryGroupModal from '../../../components/Modals/CategoryGroupModal/CategoryGroupModal';
import {
  IAddCategory,
  ICategoryResponse,
  IChar,
  IGroup,
  ICategoryToUpdate,
} from '../../../interfaces/ICategory';
import CategoryEditForm from '../../../components/Forms/Category-form/CategoryEditForm/CategoryEditForm';
import CategoryBasicInfo from './CategoryBasicInfo/CategoryBasicInfo';
import { Form, FormikProvider, useFormik } from 'formik';
import ExpandBtn from '../../../components/ExpandBtn/ExpandBtn';
import GoBackBtn from '../../../components/GoBackBtn/GoBackBtn';
import CharGroup from './CharGroup/CharGroup';
import { categoryValidationShema, getEditedChar, getFilteredKeys } from './categoryInfoHelpers';
import AsteriskIcon from '../../../assets/icons/AsteriskIcon';
import styles from './CategoryInfo.module.scss';

const CategoryInfo: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  const { loading } = useSelector((state: RootState) => state.categories);

  const baseCategory: ICategoryResponse = useSelector(
    (state: RootState) => state.categories.currentCategory
  );

  const [category, setCategory] = useState<ICategoryResponse>(baseCategory);

  useEffect(() => {
    baseCategory && setCategory(JSON.parse(JSON.stringify(baseCategory)));
  }, [baseCategory]);

  // CHARACTERISTIC GROUPS
  const [charGroup, setCharGroup] = useState<IGroup[]>([]);

  useEffect(() => {
    const modifiedCharGroup =
      category &&
      category.characteristicGroup.map(({ id, name, characteristic }) => ({
        id,
        name,
        characteristics: characteristic.map((char) => char),
      }));

    category && setCharGroup(modifiedCharGroup);
  }, [category]);

  const initialValues: IAddCategory = {
    name: category ? category.name : '',
    description: category ? category.description : '',
    key: category ? category.key : '',
  };

  // FORMIK;
  const formik = useFormik({
    initialValues,
    validationSchema: categoryValidationShema,
    onSubmit: (values): void => {
      const filteredGroupKeysObj: IGroup[] = getFilteredKeys(charGroup);

      //@ts-ignore
      const characteristicGroups: IGroup[] = filteredGroupKeysObj
        ? filteredGroupKeysObj.map((group) => ({
            ...group,
            characteristics: group.characteristics?.map((char) => ({
              ...char,
              categoryId: category.id,
            })),
          }))
        : [];

      const basicObj: ICategoryToUpdate = category && {
        id: category.id,
        ...values,
        characteristicGroups,
      };

      if (!basicObj) return;

      let valuesToDispatch: ICategoryToUpdate = basicObj;

      if (charsToDelete.length) {
        valuesToDispatch = {
          ...basicObj,
          removedCharacteristics: {
            characteristicIDs: charsToDelete,
          },
        };
      }

      if (charsToDelete.length && groupsToDelete.length) {
        valuesToDispatch = {
          ...basicObj,
          removedCharacteristics: {
            ...basicObj.removedCharacteristics,
            characteristicGroupIDs: groupsToDelete,
            characteristicIDs: charsToDelete,
          },
        };
      }

      if (groupsToDelete.length) {
        valuesToDispatch = {
          ...basicObj,
          removedCharacteristics: {
            characteristicGroupIDs: groupsToDelete,
          },
        };
      }

      dispatch(updateCategoryRequest(valuesToDispatch));

      setGroupsToDelete([]);
      setCharsToDelete([]);
      setEditBasicInfo(false);

      formik.setSubmitting(false);
    },
  });

  // EDIT BASIC INFO
  const [editBasicInfo, setEditBasicInfo] = useState<boolean>(false);

  // ADD GROUP
  const [openGroupModal, setOpenGroupModal] = useState<boolean>(false);

  const handleAddGroup = (name: string) => {
    setCharGroup([...charGroup, { tempId: Date.now(), name, characteristics: [] }]);
  };

  // EDIT GROUP
  const [editGroup, setEditGroup] = useState<boolean>(false);
  const [groupToEdit, setGroupToEdit] = useState<IGroup | null>(null);

  const handleEditGroup = (group: IGroup) => {
    if (group.id) {
      setCharGroup(charGroup.map((g) => (g.id === group.id ? group : g)));
    } else if (group.tempId) {
      setCharGroup(charGroup.map((g) => (g.tempId === group.tempId ? group : g)));
    }

    setGroupToEdit(null);
  };

  // DELETE GROUP
  const [groupsToDelete, setGroupsToDelete] = useState<number[]>([]);

  const handleDeleteGroup = (group: IGroup) => {
    if (group.id) {
      setGroupsToDelete([...groupsToDelete, group.id]);

      //@ts-ignore
      const charIds: number[] =
        group.characteristics && group.characteristics.length
          ? group.characteristics.filter((char) => char.id).map((char) => char && char.id)
          : [];

      charIds && charsToDelete
        ? setCharsToDelete(Array.from(new Set(charsToDelete.concat(charIds))))
        : setCharsToDelete([...charsToDelete]);

      setCharGroup(charGroup.filter((g) => g && g.id !== group.id));
    } else if (group.tempId) {
      setCharGroup(charGroup.filter((g) => g.tempId !== group.tempId));
    }
  };

  // ADD CHAR
  const handleAddChar = (char: IChar, groupName: string) => {
    setCharGroup(
      charGroup.map((group) =>
        group.name === groupName
          ? {
              ...group,
              characteristics: group.characteristics && [
                ...group.characteristics,
                { tempId: Date.now(), ...char },
              ],
            }
          : group
      )
    );
  };

  // EDIT CHAR
  const handleEditChar = (char: IChar, group: IGroup) => {
    category && setCharGroup(getEditedChar(charGroup, group, char));
  };

  // DELETE CHAR
  const [charsToDelete, setCharsToDelete] = useState<number[]>([]);

  const handleDeleteChar = (char: IChar) => {
    if (char.id) {
      char.id ? setCharsToDelete([...charsToDelete, char.id]) : setCharsToDelete(charsToDelete);

      setCharGroup(
        charGroup.map((group) => ({
          ...group,
          characteristics:
            group.characteristics && group.characteristics.filter((c) => c.id !== char.id),
        }))
      );
    } else if (char.tempId) {
      setCharGroup(
        charGroup.map((group) => ({
          ...group,
          characteristics:
            group.characteristics && group.characteristics.filter((c) => c.tempId !== char.tempId),
        }))
      );
    }
  };

  // EXPANDED BLOCKS
  const [expandedBlocks, setExpandedBlocks] = useState<string[]>(['main', 'characteristics']);

  const handleExpandedBlocks = (field: string) =>
    field && expandedBlocks.includes(field)
      ? setExpandedBlocks(expandedBlocks.filter((block) => block && block !== field))
      : setExpandedBlocks([...expandedBlocks, field]);

  // EXPANDED GROUPS
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  useEffect(() => {
    const groupNames =
      charGroup &&
      charGroup.length &&
      charGroup.map((group) => (group && group.name ? group.name : ''));

    groupNames ? setExpandedGroups(groupNames) : setExpandedGroups([]);
  }, [charGroup]);

  return (
    <>
      {loading && <LinearProgress />}

      {openGroupModal && (
        <CategoryGroupModal
          openGroupModal={openGroupModal}
          setOpenGroupModal={setOpenGroupModal}
          editGroup={editGroup}
          setEditGroup={setEditGroup}
          groupToEdit={groupToEdit}
          handleAddGroup={handleAddGroup}
          handleEditGroup={handleEditGroup}
          charGroup={charGroup}
        />
      )}

      {category ? (
        <div className={styles['block-wrapper-main']}>
          <GoBackBtn handleGoBack={() => history.push('/categories')} />
          <h1>{category.name}</h1>

          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
              <div className={styles['expandable-field-wrapper']}>
                <div className={styles['expandable-field']}>
                  <ExpandBtn
                    expandBlock={expandedBlocks.includes('main')}
                    handleExpand={() => handleExpandedBlocks('main')}
                    disabled={false}
                  />
                  <h4>Основна інформація</h4>
                </div>

                <IconButton
                  aria-label="edit"
                  color="default"
                  type="button"
                  onClick={() => setEditBasicInfo(true)}
                >
                  <EditIcon />
                </IconButton>
              </div>
              <div className={expandedBlocks.includes('main') ? 'expanded' : 'shrinked'}>
                {editBasicInfo ? (
                  <CategoryEditForm setFieldValue={formik.setFieldValue} />
                ) : (
                  <CategoryBasicInfo />
                )}
              </div>

              <div className={styles['expandable-field-wrapper']}>
                <div className={styles['expandable-field']}>
                  <ExpandBtn
                    expandBlock={expandedBlocks.includes('characteristics')}
                    handleExpand={() => handleExpandedBlocks('characteristics')}
                    disabled={false}
                  />
                  <h4>Характеристики</h4>
                </div>
              </div>

              <div className={expandedBlocks.includes('characteristics') ? 'expanded' : 'shrinked'}>
                <div className={styles['add-btn-wrapper']}>
                  <AddBtn
                    title="Додати групу"
                    handleAdd={() => {
                      setOpenGroupModal(true);
                    }}
                  />
                </div>
                {charGroup.some(
                  (group) => group.characteristics && group.characteristics.length
                ) ? (
                  <div className={styles['asterisk-icon-required']}>
                    <span>
                      <AsteriskIcon />
                    </span>
                    <span>Є обов`язковою характеристикою</span>
                  </div>
                ) : null}
                {charGroup && charGroup.length
                  ? charGroup.map(
                      (group) =>
                        group && (
                          <CharGroup
                            key={group.id || group.tempId}
                            group={group}
                            expandedGroups={expandedGroups}
                            setExpandedGroups={setExpandedGroups}
                            setOpenGroupModal={setOpenGroupModal}
                            setGroupToEdit={setGroupToEdit}
                            setEditGroup={setEditGroup}
                            handleDeleteGroup={handleDeleteGroup}
                            handleAddChar={handleAddChar}
                            handleEditChar={handleEditChar}
                            handleDeleteChar={handleDeleteChar}
                          />
                        )
                    )
                  : null}
              </div>
              <div className={styles['form-btn-wrapper']}>
                <Button
                  variant="contained"
                  color="default"
                  disabled={formik.isSubmitting}
                  type="submit"
                >
                  Зберегти
                </Button>
                <Button
                  onClick={() => setEditBasicInfo(false)}
                  color="secondary"
                  variant="contained"
                >
                  Скасувати
                </Button>
              </div>
            </Form>
          </FormikProvider>
        </div>
      ) : null}
    </>
  );
};

export default CategoryInfo;
