import React, { useEffect, useReducer, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, IconButton, LinearProgress } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

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
import AsteriskIcon from '../../../assets/icons/AsteriskIcon';
import { Category, categoryReducer } from './categoryReducer';
import {
  categoryDisplayReducer,
  CategoryToDisplay,
  GroupToDisplay,
} from './categoryToDisplayReducer';
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
  const category: ICategoryResponse = useSelector(
    (state: RootState) => state.categories.currentCategory
  );

  const [categoryState, categoryDispatch] = useReducer(categoryReducer, {} as Category);

  const [categoryDisplayState, categoryDisplayDispatch] = useReducer(
    categoryDisplayReducer,
    category as CategoryToDisplay
  );

  useEffect(() => {
    categoryDispatch({ type: 'setCategoryId', id: category.id });
    categoryDisplayDispatch({ type: 'setDisplayCategory', category });

    if (null !== ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [category]);

  const charGroup = categoryDisplayState.characteristicGroup;

  // FORMIK;
  const initialValues: IAddCategory = {
    name: categoryDisplayState.name ? categoryDisplayState.name : '',
    description: categoryDisplayState.description ? categoryDisplayState.description : '',
    key: categoryDisplayState.key ? categoryDisplayState.key : '',
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

      categoryDispatch({ type: 'editCategory', name, key, description });

      dispatch(updateCategoryRequest(categoryState));
      categoryDispatch({ type: 'resetCategory' });

      setEditBasicInfo(false);
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
                  <CategoryEditForm />
                ) : (
                  <CategoryBasicInfo categoryDisplayState={categoryDisplayState} />
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
                {charGroup &&
                charGroup.some((group) => group.characteristic && group.characteristic.length) ? (
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
    </div>
  );
};

export default CategoryInfo;
