import React, { useEffect, useReducer, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Card, IconButton, LinearProgress } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import { updateCategoryRequest } from '../../../store/actions/categories.actions';
import { AppDispatch, RootState } from '../../../store/store';
import AddBtn from '../../../components/AddBtn/AddBtn';
import CategoryGroupModal from '../../../components/Modals/CategoryGroupModal/CategoryGroupModal';
import { IAddCategory, ICategoryResponse } from '../../../interfaces/ICategory';
import CategoryEditForm from '../../../components/Forms/Category-form/CategoryEditForm/CategoryEditForm';
import CategoryBasicInfo from './CategoryBasicInfo/CategoryBasicInfo';
import { Form, FormikProvider, useFormik } from 'formik';
import ExpandBtn from '../../../components/ExpandBtn/ExpandBtn';
import GoBackBtn from '../../../components/GoBackBtn/GoBackBtn';
import CharGroup from './CharGroup/CharGroup';
import { categoryValidationShema } from './categoryValidationShema';
import { Category, CategoryActionTypes, categoryReducer } from './categoryReducer';
import {
  categoryDisplayReducer,
  CategoryToDisplay,
  CategoryToDisplayActionTypes,
  GroupToDisplay,
} from './categoryToDisplayReducer';
import { ErrorsAlert } from '../../../components/ErrorsAlert';
import styles from './CategoryInfo.module.scss';

const CategoryInfo: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  const ref = useRef<HTMLDivElement>(null);

  // SELECTORS
  const { loading } = useSelector((state: RootState) => state.categories);
  const categoryList: ICategoryResponse[] = useSelector(
    (state: RootState) => state.categories.list
  );
  const category: CategoryToDisplay = useSelector(
    (state: RootState) => state.categories.currentCategory
  );

  const [categoryState, categoryDispatch] = useReducer(categoryReducer, {} as Category);

  const [categoryDisplayState, categoryDisplayDispatch] = useReducer(
    categoryDisplayReducer,
    category as CategoryToDisplay
  );

  useEffect(() => {
    if (category) {
      categoryDispatch({ type: CategoryActionTypes.setCategoryId, id: category.id });
      categoryDisplayDispatch({ type: CategoryToDisplayActionTypes.setCategory, category });
    }
  }, [category]);

  const charGroup = categoryDisplayState
    ? categoryDisplayState.characteristicGroup
    : category
    ? category.characteristicGroup
    : [];

  const finishOperation = () => {
    setEditBasicInfo(false);
    if (null !== ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // FORMIK;
  const initialValues: IAddCategory = {
    name: (categoryDisplayState && categoryDisplayState?.name) || (category && category.name) || '',
    description:
      (categoryDisplayState && categoryDisplayState?.description) ||
      (category && category.description) ||
      '',
    key: (categoryDisplayState && categoryDisplayState?.key) || (category && category.key) || '',
    mainCategory: (categoryDisplayState && categoryDisplayState?.mainCategory) || (category && category.mainCategory) || '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: categoryValidationShema,
    onSubmit: (values): void => {
      const { name, key, description } = values;

      const existingName =
        categoryList.length &&
        categoryList
          .filter((cat) => cat.id !== category.id)
          .find((cat) => cat.name.toLowerCase() === name.trim().toLowerCase());

      const existingKey =
        categoryList.length &&
        categoryList
          .filter((cat) => cat.id !== category.id)
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

      dispatch(updateCategoryRequest({ ...categoryState, name, key, description }));
      categoryDispatch({ type: CategoryActionTypes.resetCategory });
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
        <CategoryGroupModal
          openGroupModal={openGroupModal}
          setOpenGroupModal={setOpenGroupModal}
          categoryDispatch={categoryDispatch}
          categoryDisplayDispatch={categoryDisplayDispatch}
          charGroup={charGroup}
          groupToEdit={groupToEdit}
          setGroupToEdit={setGroupToEdit}
        />
      )}

      {category ? (
        <div className={styles['block-wrapper']}>
          <Card className={styles['block-card']}>
            <GoBackBtn handleGoBack={() => history.push('/categories')} />
            <h1>{categoryDisplayState ? categoryDisplayState.name : category.name}</h1>

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
                  {category ? (
                    editBasicInfo ? (
                      <CategoryEditForm />
                    ) : (
                      <CategoryBasicInfo
                        categoryDisplayState={
                          categoryDisplayState ? categoryDisplayState : category
                        }
                      />
                    )
                  ) : null}
                </div>

                <ExpandBtn
                  expandBlock={expandedBlocks.includes('characteristics')}
                  handleExpand={() => handleExpandedBlocks('characteristics')}
                  disabled={false}
                >
                  <h4>Характеристики</h4>
                </ExpandBtn>

                <div
                  className={expandedBlocks.includes('characteristics') ? 'expanded' : 'shrinked'}
                >
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
                              categoryDispatch={categoryDispatch}
                              categoryDisplayDispatch={categoryDisplayDispatch}
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
      ) : null}
    </div>
  );
};

export default CategoryInfo;
