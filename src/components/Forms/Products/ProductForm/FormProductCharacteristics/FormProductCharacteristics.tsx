import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';
import { Button, createStyles, IconButton, makeStyles, ThemeOptions } from '@material-ui/core';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

import { AppDispatch, RootState } from '../../../../../store/store';
import { getTreeCategoryByIdRequest } from '../../../../../store/actions/treeCategories.actions';
import { ICharResponse } from '../../../../../interfaces/ITreeCategory';
import { charDynamicFields } from './charDynamicFields';
import { getValidationSchema } from './charDynamicValidation';
import { productValidationShema } from '../productFormHelpers';
import { getIcon } from '../../../../Modals/TreeCategoryCharModal/treeCategoryCharModalHelpers';
import { Type } from '../../../../../interfaces/IProducts';
import styles from './FormProductCharacteristics.module.scss';
import { useLocation, Link } from 'react-router-dom';
import { COLORS } from '../../../../../values/colors';
import classNames from 'classnames';

interface IProductChar {
  categoryId: number;
  formik: any;
  setValidation: (v: any) => void;
}

interface ICharArr {
  name: string;
  value: any;
  required: boolean;
  type: string;
}

const useStyles = makeStyles(
  (): ThemeOptions =>
    createStyles({
      btn: {
        borderRadius: '30px',
        color: COLORS.primaryLight,
      },
      addCharBtn: {
        'backgroundColor': COLORS.primaryBlue,
        '&:hover': {
          backgroundColor: COLORS.secondaryBlue,
        },
      },
      addCharBtnDark: {
        'backgroundColor': COLORS.darkBlue,
        '&:hover': {
          backgroundColor: COLORS.secondaryDarkBlue,
        },
      },
    })
);

const ProductCharacteristics: React.FC<IProductChar> = ({ categoryId, formik, setValidation }) => {
  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();

  const classes = useStyles();

  const { list, currentTreeCategory: category } = useSelector((state: RootState) => state.treeCategories);
  const { currentProduct: product } = useSelector((state: RootState) => state.products);
  const { darkMode } = useSelector((state: RootState) => state.theme);

  // DYNAMIC VALIDATION
  const [chars, setChars] = useState<ICharResponse[]>([]);

  useEffect(() => {
    category &&
      setChars(category.characteristicGroup.map((group) => group.characteristic.map((char) => char)).flat(1));
  }, [category]);

  const [charArray, setCharArray] = useState<ICharArr[]>([]);
  useEffect(() => {
    chars.length &&
      setCharArray(
        Object.entries(formik.values.subForm).map(([name, value]) => ({
          name,
          value,
          required: chars.find((char) => char.name === name)?.required || false,
          type: chars.find((char) => char.name === name)?.type || 'string',
          minValue: chars.find((char) => char.name === name)?.minValue || '',
          maxValue: chars.find((char) => char.name === name)?.maxValue || '',
        }))
      );
  }, [chars, formik.values.subForm]);

  useEffect(() => {
    charArray && setValidation(productValidationShema.shape(getValidationSchema(charArray)));
  }, [charArray, setValidation]);

  // CATEGORY
  useEffect(() => {
    if (categoryId) {
      dispatch(getTreeCategoryByIdRequest(categoryId));
    }
  }, [categoryId, dispatch, list]);

  // EXPANDED GROUPS
  const [expandedGroups, setExpandedGroups] = useState<(number | undefined)[]>([]);

  useEffect(() => {
    if (category && category.characteristicGroup && category.characteristicGroup.length) {
      setExpandedGroups(category?.characteristicGroup.map((group) => group.id));
    } else {
      setExpandedGroups([]);
    }
  }, [category]);

  const handleExpandedGroups = (id: number | undefined) =>
    id && expandedGroups.includes(id)
      ? setExpandedGroups(expandedGroups.filter((groupId) => groupId && groupId !== id))
      : setExpandedGroups([...expandedGroups, id]);

  return (
    <>
      {category ? (
        <>
          {category?.characteristicGroup.some(
            (group) => group.characteristic && group.characteristic.length
          ) ? (
            <>
              <PriorityHighIcon style={{ color: 'red' }} />
              <span>Є обов`язковою характеристикою</span>
            </>
          ) : (
            <div>
              <p>Відсутні характеристики для даної категорії</p>
              <Link
                to={{
                  pathname: `/tree-category/${category.id}`,
                  state: { from: `${location.pathname}` },
                }}
              >
                <Button
                  className={classNames(classes.btn, darkMode ? classes.addCharBtnDark : classes.addCharBtn)}
                  variant="contained"
                  startIcon={<AddIcon />}
                  type="button"
                >
                  Додати характеристики
                </Button>
              </Link>
            </div>
          )}

          <div className={darkMode ? styles['additional-info-block-dark'] : ''}>
            {category?.characteristicGroup.map((group) => (
              <div key={group.id}>
                <div className={darkMode ? styles['group-wrapper-dark'] : styles['group-wrapper']}>
                  <span
                    className={expandedGroups.includes(group.id) ? styles['hide-btn'] : styles['expand-btn']}
                    onClick={() => handleExpandedGroups(group.id)}
                  >
                    <ArrowIcon />
                  </span>
                  <span className={styles['group-name']}>{group.name}</span>
                </div>

                <div className={expandedGroups.includes(group.id) ? 'expanded' : 'shrinked'}>
                  {group.characteristic
                    .sort((a, b) => a.id - b.id)
                    .map((char) => (
                      <div
                        key={char.id}
                        className={darkMode ? styles['char-wrapper-dark'] : styles['char-wrapper']}
                      >
                        <div className={styles['char-block']}>
                          <div className={styles['char-block-with-input']}>
                            <div className={styles['char-name-wrapper']}>
                              {char.type !== Type.json && char.required ? (
                                <PriorityHighIcon style={{ color: 'red' }} />
                              ) : null}

                              <span className={styles['list-icon']}>{getIcon(char.type)}</span>
                              <span key={char.id}>{char.name}</span>
                              {char.type === Type.json ? (
                                <div className={styles['json-btns']}>
                                  <IconButton
                                    type="button"
                                    aria-label="add"
                                    color="primary"
                                    title="Додати значення"
                                    onClick={() => {
                                      const newEntry = formik.values?.subForm?.[char.name].newEntry;
                                      let lastIndex;
                                      if (newEntry) {
                                        lastIndex = Object.keys(newEntry).length;
                                      }

                                      formik.setValues({
                                        ...formik.values,
                                        subForm: {
                                          ...formik.values?.subForm,
                                          [char.name]: {
                                            ...formik.values?.subForm[char.name],
                                            newEntry: !newEntry
                                              ? { newEntry1: { key: '', value: '' } }
                                              : {
                                                  ...newEntry,
                                                  [`newEntry${lastIndex + 1}`]: { key: '', value: '' },
                                                },
                                          },
                                        },
                                      });
                                    }}
                                  >
                                    <AddIcon />
                                  </IconButton>
                                </div>
                              ) : null}
                              {char.type === Type.range ? (
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
                            <div className={styles['input-wrapper']}>
                              {charDynamicFields(char, formik, product)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
};

export default React.memo(ProductCharacteristics);
