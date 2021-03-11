import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowIcon from '@material-ui/icons/ArrowBackIos';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';

import AsteriskIcon from '../../../../../assets/icons/AsteriskIcon';
import { AppDispatch, RootState } from '../../../../../store/store';
import { getCategoryByIdRequest } from '../../../../../store/actions/categories.actions';
import { ICharResponse } from '../../../../../interfaces/ICategory';
import { charDynamicFields } from './charDynamicFields';
import { getValidationSchema } from './charDynamicValidation';
import { productValidationShema } from '../productFormHelpers';
import { getIcon } from '../../../../Modals/CategoryCharModal/categoryCharModalHelpers';
import styles from './FormProductCharacteristics.module.scss';

interface IProductChar {
  categoryName: string;
  formik: any;
  setValidation: (v: any) => void;
}

interface ICharArr {
  name: string;
  value: any;
  required: boolean;
  type: string;
}

const ProductCharacteristics: React.FC<IProductChar> = ({
  categoryName,
  formik,
  setValidation,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const { list, currentCategory: category } = useSelector((state: RootState) => state.categories);
  const { currentProduct: product } = useSelector((state: RootState) => state.products);
  const { darkMode } = useSelector((state: RootState) => state.theme);

  // DYNAMIC VALIDATION
  const [chars, setChars] = useState<ICharResponse[]>([]);

  useEffect(() => {
    category &&
      setChars(
        category.characteristicGroup
          .map((group) => group.characteristic.map((char) => char))
          .flat(1)
      );
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
    const category = list.find((category) => category.name === categoryName);

    category && dispatch(getCategoryByIdRequest(category.id));
  }, [categoryName, dispatch, list]);

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
            <div className={styles['asterisk-indicator']}>
              <span>
                <AsteriskIcon />
              </span>
              <span>Є обов`язковою характеристикою</span>
            </div>
          ) : null}

          <div className={darkMode ? styles['additional-info-block-dark'] : ''}>
            {category?.characteristicGroup.map((group) => (
              <div key={group.id}>
                <div className={darkMode ? styles['group-wrapper-dark'] : styles['group-wrapper']}>
                  <span
                    className={
                      expandedGroups.includes(group.id) ? styles['hide-btn'] : styles['expand-btn']
                    }
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
                              {char.type !== 'json' ? (
                                <div
                                  className={
                                    !char.required
                                      ? styles['asterisk-icon']
                                      : styles['asterisk-icon-required']
                                  }
                                >
                                  <AsteriskIcon />
                                </div>
                              ) : null}

                              <span className={styles['list-icon']}>{getIcon(char.type)}</span>
                              <span key={char.id}>{char.name}</span>
                              {char.type === 'json' ? (
                                <div className={styles['json-btns']}>
                                  <IconButton
                                    type="button"
                                    aria-label="add"
                                    color="primary"
                                    title="Додати значення"
                                    disabled={
                                      formik.values.subForm[char.name] &&
                                      Object.entries(formik.values.subForm[char.name]).length
                                        ? !!Object.entries(formik.values.subForm[char.name]).some(
                                            ([key, value]) => key && !value
                                          )
                                        : false
                                    }
                                    onClick={() => {
                                      const objectKeys = Object.keys(
                                        formik.values?.subForm[char.name]
                                      );
                                      const idx =
                                        formik.values?.subForm[char.name] && !objectKeys.length
                                          ? 1
                                          : objectKeys.length &&
                                            +objectKeys[objectKeys.length - 1].split('-')[1] + 1;

                                      formik.setValues({
                                        ...formik.values,
                                        subForm: {
                                          ...formik.values?.subForm,
                                          [char.name]: {
                                            ...formik.values?.subForm[char.name],
                                            [`value-${idx}`]: '',
                                          },
                                        },
                                      });
                                    }}
                                  >
                                    <AddIcon />
                                  </IconButton>
                                  <IconButton
                                    type="button"
                                    aria-label="delete"
                                    color="secondary"
                                    title="Видалити значення"
                                    disabled={
                                      formik.values?.subForm[char.name] &&
                                      !Object.keys(formik.values?.subForm[char.name]).length
                                    }
                                    onClick={() =>
                                      formik.setValues({
                                        ...formik.values,
                                        subForm: {
                                          ...formik.values?.subForm,
                                          [char.name]: {},
                                        },
                                      })
                                    }
                                  >
                                    <ClearIcon />
                                  </IconButton>
                                </div>
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

export default ProductCharacteristics;