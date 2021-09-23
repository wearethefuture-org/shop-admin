import React, { FC } from 'react';
import { IGetTreeCategoriesResponse } from '../../../../interfaces/ITreeCategory';
import styles from './CategoriesItems.module.scss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

interface CategoriesItemsProps {
  list?: IGetTreeCategoriesResponse[];
  handleClick: (id: number, mpath?: string) => void;
}

const CategoriesItems: FC<CategoriesItemsProps> = ({ list, handleClick }) => {
  return (
    <div className={styles.resultsBlock}>
      <List>
        {list?.length ? (
          <>
            {list.map((item) => {
              return (
                <ListItem key={item.id}>
                  <span
                    className={styles.listItem}
                    onClick={() => handleClick(item.id, item.mpath)}
                  >
                    {item.name}
                  </span>
                </ListItem>
              );
            })}
          </>
        ) : (
          <p>Нажаль, нічого не знайдено.</p>
        )}
      </List>
    </div>
  );
};

export default CategoriesItems;
