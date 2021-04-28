import React, { useEffect, useReducer, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Card, IconButton, LinearProgress } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { updateMainCategoryRequest } from '../../../store/actions/mainCategories.actions';
import { AppDispatch, RootState } from '../../../store/store';
import { IAddMainCategory, IMainCategoryResponse } from '../../../interfaces/IMainCategory';
import MainCategoryEditForm from '../../../components/Forms/MainCategory-form/MainCategoryEditForm/MainCategoryEditForm';
import MainCategoryBasicInfo from './MainCategoryBasicInfo/MainCategoryBasicInfo';
import { Form, FormikProvider, useFormik } from 'formik';
import ExpandBtn from '../../../components/ExpandBtn/ExpandBtn';
import GoBackBtn from '../../../components/GoBackBtn/GoBackBtn';

import { mainCategoryValidationShema } from './mainCategoryValidationShema';
import { MainCategory, MainCategoryActionTypes, mainCategoryReducer } from './mainCategoryReducer';
import {
  mainCategoryDisplayReducer,
  MainCategoryToDisplay,
  MainCategoryToDisplayActionTypes,
} from './mainCategoryToDisplayReducer';
import { ErrorsAlert } from '../../../components/ErrorsAlert';
import styles from './MainCategoryInfo.module.scss';

const MinCategoryInfo: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  const ref = useRef<HTMLDivElement>(null);

  // SELECTORS
  const { loading } = useSelector((state: RootState) => state.mainCategories);
  const mainCategoryList: IMainCategoryResponse[] = useSelector(
    (state: RootState) => state.mainCategories.list
  );
  const mainCategory: MainCategoryToDisplay = useSelector(
    (state: RootState) => state.mainCategories.currentMainCategory
  );

  const [mainCategoryState, mainCategoryDispatch] = useReducer(mainCategoryReducer, {} as MainCategory);

  const [mainCategoryDisplayState, mainCategoryDisplayDispatch] = useReducer(
    mainCategoryDisplayReducer,
    mainCategory as MainCategoryToDisplay
  );

  useEffect(() => {
    if (mainCategory) {
      mainCategoryDispatch({ type: MainCategoryActionTypes.setMainCategoryId, id: mainCategory.id });
      mainCategoryDisplayDispatch({ type: MainCategoryToDisplayActionTypes.setMainCategory, mainCategory }); 
    }
  }, [mainCategory]);

  /*const charGroup = categoryDisplayState
    ? categoryDisplayState.characteristicGroup
    : category
    ? category.characteristicGroup
    : []; */

  const finishOperation = () => {
    setEditBasicInfo(false);
    if (null !== ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // FORMIK;
  const initialValues: IAddMainCategory = {
    name: (mainCategoryDisplayState && mainCategoryDisplayState?.name) || (mainCategory && mainCategory.name) || '',
    description:
      (mainCategoryDisplayState && mainCategoryDisplayState?.description) || (mainCategory && mainCategory.description) || '',
    key: (mainCategoryDisplayState && mainCategoryDisplayState?.key) || (mainCategory && mainCategory.key) || '',
    
  };

  const formik = useFormik({
    initialValues,
    validationSchema: mainCategoryValidationShema,
    onSubmit: (values): void => {
      const { name, key, description, } = values;
      
      const existingName =
        mainCategoryList.length &&
        mainCategoryList
          .filter((cat) => cat.id !== mainCategory.id)
          .find((cat) => cat.name.toLowerCase() === name.trim().toLowerCase());

      const existingKey =
        mainCategoryList.length &&
        mainCategoryList
          .filter((cat) => cat.id !== mainCategory.id)
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

      
      dispatch(updateMainCategoryRequest({ ...mainCategoryState, name, key, description,  }));
      mainCategoryDispatch({ type: MainCategoryActionTypes.resetMainCategory });
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
 /* const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  useEffect(() => {
    const groupNames =
      charGroup &&
      charGroup.length &&
      charGroup.map((group) => (group && group.name ? group.name : ''));

    groupNames ? setExpandedGroups(groupNames) : setExpandedGroups([]);
  }, [charGroup]); */

  // OPEN GROUP MODAL
  //const [openGroupModal, setOpenGroupModal] = useState<boolean>(false);

  // EDIT GROUP
  //const [groupToEdit, setGroupToEdit] = useState<GroupToDisplay | null>(null);

  return (
    <div ref={ref}>
      {loading && <LinearProgress />}

      

      {mainCategory ? (
        <div className={styles['block-wrapper']}>
          <Card className={styles['block-card']}>
            <GoBackBtn handleGoBack={() => history.push('/mainCategories')} />
            <h1>{mainCategoryDisplayState ? mainCategoryDisplayState.name : mainCategory.name}</h1>

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
                  {mainCategory ? (
                    editBasicInfo ? (
                      <MainCategoryEditForm />
                    ) : (
                      <MainCategoryBasicInfo
                        mainCategoryDisplayState={
                          mainCategoryDisplayState ? mainCategoryDisplayState : mainCategory
                        }
                      />
                    )
                  ) : null}
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

export default MinCategoryInfo;
