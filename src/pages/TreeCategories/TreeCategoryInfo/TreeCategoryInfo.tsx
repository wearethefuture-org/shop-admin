import React, { useEffect, useReducer, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Card, IconButton, LinearProgress } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import { updateTreeCategoryRequest } from '../../../store/actions/treeCategories.actions';
import { AppDispatch, RootState } from '../../../store/store';
import AddBtn from '../../../components/AddBtn/AddBtn';
import DeleteTreeCategoryModal from '../../../components/Modals/TreeCategoryModal/DeleteTreeCategoryModal/DeleteTreeCategoryModal';
import TreeCategoryGroupModal from '../../../components/Modals/TreeCategoryGroupModal/TreeCategoryGroupModal';
import { IGetTreeCategoriesResponse, IAddTreeCategory } from '../../../interfaces/ITreeCategory';
import TreeCategoryEditForm from '../../../components/Forms/TreeCategoryEditForm/TreeCategoryEditForm';
import TreeCategoryBasicInfo from './TreeCategoryBasicInfo/TreeCategoryBasicInfo';
import { Form, FormikProvider, useFormik } from 'formik';
import ExpandBtn from '../../../components/ExpandBtn/ExpandBtn';
import GoBackBtn from '../../../components/GoBackBtn/GoBackBtn';
import CharGroup from './CharGroup/CharGroup';
import { treeCategoryValidationShema } from './treeCategoryValidationShema';
import { TreeCategory, TreeCategoryActionTypes, treeCategoryReducer } from './treeCategoryReducer';
import {
  treeCategoryDisplayReducer,
  TreeCategoryToDisplay,
  TreeCategoryToDisplayActionTypes,
  GroupToDisplay,
} from './treeCategoryToDisplayReducer';
import { ErrorsAlert } from '../../../components/ErrorsAlert';
import styles from './TreeCategoryInfo.module.scss';

const TreeCategoryInfo: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  // Delete Modal
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const closeDeleteModal = () => {
    setOpenDeleteDialog(false);
  };

  const ref = useRef<HTMLDivElement>(null);

  // SELECTORS
  const { loading } = useSelector((state: RootState) => state.treeCategories);
  const treeCategoriesList: IGetTreeCategoriesResponse[] = useSelector(
    (state: RootState) => state.treeCategories.list
  );

  const treeCategory: TreeCategoryToDisplay = useSelector(
    (state: RootState) => state.treeCategories.currentTreeCategory
  );

  const [treeCategoryState, treeCategoryDispatch] = useReducer(
    treeCategoryReducer,
    {} as TreeCategory
  );

  const [treeCategoryDisplayState, treeCategoryDisplayDispatch] = useReducer(
    treeCategoryDisplayReducer,
    treeCategory as TreeCategoryToDisplay
  );

  useEffect(() => {
    if (treeCategory) {
      treeCategoryDispatch({
        type: TreeCategoryActionTypes.setTreeCategoryId,
        id: treeCategory.id,
      });
      treeCategoryDisplayDispatch({
        type: TreeCategoryToDisplayActionTypes.setTreeCategory,
        category: treeCategory,
      });
    }
  }, [treeCategory]);

  const charGroup = treeCategoryDisplayState
    ? treeCategoryDisplayState.characteristicGroup
    : treeCategory
    ? treeCategory.characteristicGroup
    : [];

  const finishOperation = () => {
    setEditBasicInfo(false);
    if (null !== ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // FORMIK;
  const initialValues: IAddTreeCategory = {
    name: treeCategory && treeCategory.name ? treeCategory.name : '',
    description: treeCategory && treeCategory.description ? treeCategory.description : '',
    key: treeCategory && treeCategory.key ? treeCategory.key : '',
    parentId: treeCategory?.parent && treeCategory.parent.id ? treeCategory.parent.id : null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: treeCategoryValidationShema,
    enableReinitialize: true,
    onSubmit: (values: IAddTreeCategory): void => {
      const { name, key, description, parentId } = values;

      const existingName =
        treeCategoriesList.length &&
        treeCategoriesList
          .filter((cat) => cat.id !== treeCategory.id)
          .find((cat) => cat.name.toLowerCase() === name.trim().toLowerCase());

      const existingKey =
        treeCategoriesList.length &&
        treeCategoriesList
          .filter((cat) => cat.id !== treeCategory.id)
          .find((cat) => cat.key.toLowerCase() === key.trim().toLowerCase());

      if (existingName) {
        formik.setFieldError('name', 'Така категорія вже існує');
        formik.setSubmitting(false);
        return;
      }

      if (existingKey) {
        formik.setFieldError('key', 'Такий URL-ключ вже існує');
        formik.setSubmitting(false);
        return;
      }

      dispatch(
        updateTreeCategoryRequest({
          ...treeCategoryState,
          name,
          key,
          description,
          parentCategory: parentId,
        })
      );
      treeCategoryDispatch({ type: TreeCategoryActionTypes.resetTreeCategory });
      finishOperation();
      formik.setSubmitting(false);
    },
  });

  // EDIT BASIC INFO
  const [editBasicInfo, setEditBasicInfo] = useState<boolean>(false);

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

  // OPEN GROUP MODAL
  const [openGroupModal, setOpenGroupModal] = useState<boolean>(false);

  // EDIT GROUP
  const [groupToEdit, setGroupToEdit] = useState<GroupToDisplay | null>(null);

  return (
    <div ref={ref}>
      {loading && <LinearProgress />}

      {openGroupModal && charGroup && (
        <TreeCategoryGroupModal
          openGroupModal={openGroupModal}
          setOpenGroupModal={setOpenGroupModal}
          treeCategoryDispatch={treeCategoryDispatch}
          treeCategoryDisplayDispatch={treeCategoryDisplayDispatch}
          charGroup={charGroup}
          groupToEdit={groupToEdit}
          setGroupToEdit={setGroupToEdit}
        />
      )}
      {openDeleteDialog && (
        <DeleteTreeCategoryModal
          lastCategory={true}
          handleClose={closeDeleteModal}
          categoryInfo={{ id: treeCategory.id, name: treeCategory?.name ? treeCategory.name : '' }}
        />
      )}
      <div className={styles['block-wrapper']}>
        <Card className={styles['block-card']}>
          <GoBackBtn handleGoBack={() => history.push('/tree-categories')} />
          <h1>
            {treeCategoryDisplayState
              ? treeCategoryDisplayState.name
              : treeCategory
              ? treeCategory.name
              : ''}
          </h1>

          <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
              <div className={styles['expandable-field-wrapper']}>
                <ExpandBtn
                  expandBlock={expandedBlocks.includes('main')}
                  handleExpand={() => handleExpandedBlocks('main')}
                  disabled={false}
                >
                  <h4>Основна інформація</h4>
                </ExpandBtn>
                <div>
                  <IconButton
                    aria-label="edit"
                    color="default"
                    type="button"
                    onClick={() => setEditBasicInfo(true)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    type="button"
                    onClick={() => setOpenDeleteDialog(true)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
              <div className={expandedBlocks.includes('main') ? 'expanded' : 'shrinked'}>
                {editBasicInfo ? <TreeCategoryEditForm /> : <TreeCategoryBasicInfo />}
              </div>

              <ExpandBtn
                expandBlock={expandedBlocks.includes('characteristics')}
                handleExpand={() => handleExpandedBlocks('characteristics')}
                disabled={false}
              >
                <h4>Характеристики</h4>
              </ExpandBtn>

              <div className={expandedBlocks.includes('characteristics') ? 'expanded' : 'shrinked'}>
                <div className={styles['add-btn-wrapper']}>
                  <AddBtn
                    title="Додати групу"
                    handleAdd={() => {
                      setOpenGroupModal(true);
                    }}
                  />
                </div>
                {charGroup &&
                charGroup.some((group) => group.characteristic && group.characteristic.length) ? (
                  <>
                    <PriorityHighIcon style={{ color: 'red' }} />
                    <span>Є обов`язковою характеристикою</span>
                  </>
                ) : null}

                {charGroup && charGroup.length
                  ? charGroup.map(
                      (group) =>
                        group && (
                          <CharGroup
                            key={group.name}
                            group={group}
                            expandedGroups={expandedGroups}
                            setExpandedGroups={setExpandedGroups}
                            setOpenGroupModal={setOpenGroupModal}
                            setGroupToEdit={setGroupToEdit}
                            treeCategoryDispatch={treeCategoryDispatch}
                            treeCategoryDisplayDispatch={treeCategoryDisplayDispatch}
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
                <Button onClick={finishOperation} color="secondary" variant="contained">
                  Скасувати
                </Button>
              </div>
              <ErrorsAlert />
            </Form>
          </FormikProvider>
        </Card>
      </div>
    </div>
  );
};

export default TreeCategoryInfo;
