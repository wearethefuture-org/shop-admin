import React, { useEffect, useReducer, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { updateTreeCategoryRequest } from '../../../store/actions/treeCategories.actions';
import { AppDispatch, RootState } from '../../../store/store';
import { IGetTreeCategoriesResponse } from '../../../interfaces/ITreeCategory';

import { categoryValidation } from '../../../components/Forms/TreeCategories/TreeCategoryEditModalForm/TreeCategoryEditModalForm';
import AddBtn from '../../../components/AddBtn/AddBtn';
import DeleteTreeCategoryModal from '../../../components/Modals/TreeCategoryModal/DeleteTreeCategoryModal/DeleteTreeCategoryModal';
import TreeCategoryGroupModal from '../../../components/Modals/TreeCategoryGroupModal/TreeCategoryGroupModal';
import TreeCategoryEditForm from '../../../components/Forms/TreeCategories/TreeCategoryEditForm/TreeCategoryEditForm';
import TreeCategoryBasicInfo from './TreeCategoryBasicInfo/TreeCategoryBasicInfo';
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
import { disableEnableCategoryRequest } from '../../../store/actions/treeCategories.actions';

import styles from './TreeCategoryInfo.module.scss';
import {
  alpha,
  Button,
  Card,
  createStyles,
  IconButton,
  LinearProgress,
  makeStyles,
  Switch,
  Theme,
  ThemeOptions,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import DisableTreeCategoryModal from '../../../components/Modals/TreeCategoryModal/DisableTreeCategoryModal/DisableTreeCategoryModal';
import { COLORS } from '../../../values/colors';
import classNames from 'classnames';

const useStyles = makeStyles(
  (theme: Theme): ThemeOptions =>
    createStyles({
      editButton: {
        color: COLORS.primaryBlue,
      },
      editButtonDark: {
        color: COLORS.darkBlue,
      },
      deleteButton: {
        color: COLORS.primaryRed,
      },
      deleteButtonDark: {
        color: COLORS.darkRed,
      },
      switch: {
        '& .MuiSwitch-switchBase.Mui-checked': {
          'color': COLORS.primaryGreen,
          '&:hover': {
            backgroundColor: alpha(COLORS.primaryGreen, theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: COLORS.primaryGreen,
        },
      },
      switchDark: {
        '& .MuiSwitch-switchBase.Mui-checked': {
          'color': COLORS.darkGreen,
          '&:hover': {
            backgroundColor: alpha(COLORS.darkGreen, theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: COLORS.darkGreen,
        },
      },
      btn: {
        borderRadius: '30px',
        padding: '6px 15px 6px 15px',
        color: COLORS.primaryLight,
      },
      saveButton: {
        'backgroundColor': COLORS.primaryGreen,
        '&:hover': {
          backgroundColor: COLORS.secondaryGreen,
        },
      },
      saveButtonDark: {
        'backgroundColor': COLORS.darkGreen,
        '&:hover': {
          backgroundColor: COLORS.secondaryDarkGreen,
        },
      },
      cancelButton: {
        'backgroundColor': COLORS.primaryGray,
        '&:hover': {
          backgroundColor: COLORS.secondaryGray,
        },
      },
      cancelButtonDark: {
        'backgroundColor': COLORS.darkGray,
        '&:hover': {
          backgroundColor: COLORS.secondaryDarkGray,
        },
      },
    })
);

const TreeCategoryInfo: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const { searchProps } = Object(history.location.state);
  const classes = useStyles();

  // Delete Modal
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const closeDeleteModal = () => {
    setOpenDeleteDialog(false);
  };

  const [openDisableDialog, setOpenDisableDialog] = useState<boolean>(false);

  const closeDisableModal = () => {
    setOpenDisableDialog(false);
  };

  const ref = useRef<HTMLDivElement>(null);

  // SELECTORS
  const { loading } = useSelector((state: RootState) => state.treeCategories);
  const treeCategoriesList: IGetTreeCategoriesResponse[] = useSelector(
    (state: RootState) => state.treeCategories.list
  );
  const { darkMode } = useSelector((state: RootState) => state.theme);

  const treeCategory: TreeCategoryToDisplay = useSelector(
    (state: RootState) => state.treeCategories.currentTreeCategory
  );

  const [treeCategoryState, treeCategoryDispatch] = useReducer(treeCategoryReducer, {} as TreeCategory);

  const [treeCategoryDisplayState, treeCategoryDisplayDispatch] = useReducer(
    treeCategoryDisplayReducer,
    treeCategory as TreeCategoryToDisplay
  );

  const [categoryStatus, setCategoryStatus] = useState(treeCategory.disabledByAdmin);

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
  const initialValues = {
    name: treeCategory && treeCategory.name ? treeCategory.name : '',
    description: treeCategory && treeCategory.description ? treeCategory.description : '',
    key: treeCategory && treeCategory.key ? treeCategory.key : '',
    parentId: treeCategory?.parent?.id ? treeCategory.parent.id : null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: treeCategoryValidationShema,
    enableReinitialize: true,
    onSubmit: async (values) => {
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

      const validation = await categoryValidation(dispatch, parentId ? parentId : treeCategory?.parent?.id);

      if (!validation) {
        return false;
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
      charGroup && charGroup.length && charGroup.map((group) => (group && group.name ? group.name : ''));

    groupNames ? setExpandedGroups(groupNames) : setExpandedGroups([]);
  }, [charGroup]);

  // OPEN GROUP MODAL
  const [openGroupModal, setOpenGroupModal] = useState<boolean>(false);

  // EDIT GROUP
  const [groupToEdit, setGroupToEdit] = useState<GroupToDisplay | null>(null);

  const [disableSwitcherValue, setDisableSwitcherValue] = useState(treeCategory.disabledByAdmin);
  const handleDisableCategory: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const data = {
      disable: e.target.checked,
      id: treeCategory.id,
    };

    if (treeCategory.parent || treeCategory.children.length) {
      setDisableSwitcherValue(e.target.checked);
      setOpenDisableDialog(true);
    } else {
      setCategoryStatus(data.disable);
      dispatch(disableEnableCategoryRequest(data));
    }
  };

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
          categoryInfo={{
            id: treeCategory.id,
            name: treeCategory?.name ? treeCategory.name : '',
          }}
        />
      )}
      {openDisableDialog && (
        <DisableTreeCategoryModal
          switcherValue={disableSwitcherValue}
          categoryInfo={treeCategory}
          handleClose={closeDisableModal}
        />
      )}
      <div className={styles['block-wrapper']}>
        <Card className={styles['block-card']}>
          <GoBackBtn
            handleGoBack={() =>
              history.push({
                pathname: '/tree-categories',
                state: {
                  id: searchProps?.targetId,
                  mpath: searchProps?.mpath,
                },
              })
            }
          />
          <h1>
            {treeCategoryDisplayState ? treeCategoryDisplayState.name : treeCategory ? treeCategory.name : ''}
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
                <div className={styles['control-block']}>
                  <IconButton
                    aria-label="edit"
                    color="primary"
                    type="button"
                    onClick={() => setEditBasicInfo(true)}
                  >
                    <EditIcon className={darkMode ? classes.editButtonDark : classes.editButton} />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    type="button"
                    onClick={() => setOpenDeleteDialog(true)}
                  >
                    <DeleteIcon className={darkMode ? classes.deleteButtonDark : classes.deleteButton} />
                  </IconButton>
                  <div>
                    <span>Disable</span>
                    <Switch
                      className={darkMode ? classes.switchDark : classes.switch}
                      checked={treeCategory.disabledByAdmin}
                      onChange={handleDisableCategory}
                    />
                  </div>
                </div>
              </div>
              <div className={expandedBlocks.includes('main') ? 'expanded' : 'shrinked'}>
                {editBasicInfo ? <TreeCategoryEditForm /> : <TreeCategoryBasicInfo />}
              </div>
              {
                <>
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
                </>
              }
              <div className={styles['form-btn-wrapper']}>
                <Button
                  className={classNames(classes.btn, darkMode ? classes.saveButtonDark : classes.saveButton)}
                  disabled={formik.isSubmitting}
                  type="submit"
                >
                  Зберегти
                </Button>
                <Button
                  onClick={finishOperation}
                  className={classNames(
                    classes.btn,
                    darkMode ? classes.cancelButtonDark : classes.cancelButton
                  )}
                >
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
